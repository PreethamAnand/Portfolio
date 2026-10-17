import os
import sys
import subprocess
import numpy as np
from PIL import Image

def get_ffmpeg():
    # Check if imageio_ffmpeg is installed
    try:
        import imageio_ffmpeg
        exe = imageio_ffmpeg.get_ffmpeg_exe()
        if os.path.exists(exe):
            return exe
    except ImportError:
        pass
    return "ffmpeg"

def main():
    ffmpeg = get_ffmpeg()
    print(f"Using ffmpeg: {ffmpeg}")
    
    os.makedirs("public/hero", exist_ok=True)
    os.makedirs("public", exist_ok=True)
    
    input_video = "intro.mp4"
    if not os.path.exists(input_video):
        print(f"Error: {input_video} not found")
        sys.exit(1)

    # 1. Video crop & scale parameters:
    # 1280x720 video, person center ~ 635, ratio 768:960 (4:5) -> crop 576x720 from x=348, y=0
    # Scale to 768x960
    # Background whitening: colorlevels=rimax=0.98:gimax=0.98:bimax=0.98
    crop_w = 576
    crop_h = 720
    crop_x = 348
    crop_y = 0
    scale_w = 768
    scale_h = 960

    print("Step 1 & 2 & 3: Building seamless video loop with xfade and whitened background...")
    
    # We will:
    # A) Pre-process first 10s video with crop, scale, and colorlevels to temp_pre.mp4
    vf_pre = f"crop={crop_w}:{crop_h}:{crop_x}:{crop_y},scale={scale_w}:{scale_h}:flags=lanczos,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98,format=yuv420p"
    temp_pre = "public/hero/temp_pre.mp4"
    subprocess.run([
        ffmpeg, "-y", "-ss", "0", "-t", "10",
        "-i", input_video,
        "-vf", vf_pre,
        "-c:v", "libx264", "-crf", "18", "-preset", "fast",
        "-an",
        temp_pre
    ], check=True)
    
    # B) Video crossfade:
    # Duration = 10.0s, fade = 0.5s.
    # Clip 0 is trim=0.5:10.0 (duration 9.5s)
    # Clip 1 is trim=0.0:0.5 (duration 0.5s)
    # xfade offset = 9.5 - 0.5 = 9.0s
    temp_seamless_v = "public/hero/temp_seamless_v.mp4"
    vf_xfade = "[0:v]trim=0.5:10.0,setpts=PTS-STARTPTS,fps=24[v0]; [0:v]trim=0.0:0.5,setpts=PTS-STARTPTS,fps=24[v1]; [v0][v1]xfade=transition=fade:duration=0.5:offset=9.0,format=yuv420p[v]"
    subprocess.run([
        ffmpeg, "-y",
        "-i", temp_pre,
        "-filter_complex", vf_xfade,
        "-map", "[v]",
        "-c:v", "libx264", "-crf", "18", "-preset", "fast",
        temp_seamless_v
    ], check=True)

    # C) Audio extraction & seamless crossfade in numpy
    print("Step 3 (audio): Sample-accurate numpy cross-fade...")
    temp_audio_in = "public/hero/temp_audio_10s.raw"
    sample_rate = 48000
    channels = 2
    # Extract 10.0s raw PCM s16le
    subprocess.run([
        ffmpeg, "-y", "-ss", "0", "-t", "10",
        "-i", input_video,
        "-f", "s16le", "-ar", str(sample_rate), "-ac", str(channels),
        temp_audio_in
    ], check=True)

    with open(temp_audio_in, "rb") as f:
        audio_data = np.frombuffer(f.read(), dtype=np.int16).reshape(-1, channels)

    total_samples = int(10.0 * sample_rate)
    fade_samples = int(0.5 * sample_rate)
    audio_data = audio_data[:total_samples]

    clip_b = audio_data[:fade_samples].astype(np.float32)
    clip_a = audio_data[fade_samples:].astype(np.float32)

    # Crossfade the last fade_samples of clip_a with clip_b
    weights = np.linspace(0.0, 1.0, fade_samples)[:, None]
    clip_a[-fade_samples:] = clip_a[-fade_samples:] * (1.0 - weights) + clip_b * weights
    seamless_audio = np.clip(clip_a, -32768, 32767).astype(np.int16)

    temp_audio_out = "public/hero/temp_audio_seamless.raw"
    with open(temp_audio_out, "wb") as f:
        f.write(seamless_audio.tobytes())

    # Step 4: Export hero.mp4 and hero.webm
    print("Step 4: Exporting hero.mp4 and hero.webm...")
    hero_mp4 = "public/hero/hero.mp4"
    subprocess.run([
        ffmpeg, "-y",
        "-i", temp_seamless_v,
        "-f", "s16le", "-ar", str(sample_rate), "-ac", str(channels), "-i", temp_audio_out,
        "-c:v", "libx264", "-crf", "24", "-preset", "slow", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        hero_mp4
    ], check=True)

    hero_webm = "public/hero/hero.webm"
    subprocess.run([
        ffmpeg, "-y",
        "-i", temp_seamless_v,
        "-f", "s16le", "-ar", str(sample_rate), "-ac", str(channels), "-i", temp_audio_out,
        "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
        "-c:a", "libopus", "-b:a", "80k",
        hero_webm
    ], check=True)

    # Clean up temp files
    for temp in [temp_pre, temp_seamless_v, temp_audio_in, temp_audio_out]:
        if os.path.exists(temp):
            try:
                os.remove(temp)
            except Exception:
                pass

    print(f"Successfully generated {hero_mp4} ({os.path.getsize(hero_mp4)} bytes)")
    print(f"Successfully generated {hero_webm} ({os.path.getsize(hero_webm)} bytes)")

    # Step 5: Portrait still (head-to-shirt crop at 480x600 saved as portrait-bust.webp) and og.jpg (1200x630)
    print("Step 5: Generating portrait-bust.webp and og.jpg...")
    if os.path.exists("id_car-img.jpg"):
        img = Image.open("id_car-img.jpg").convert("RGB")
        # In id_car-img.jpg (1261 x 1280): Preetham is in gray suit with lanyard
        # Head is around x ~ 480, y ~ 450, chest around y ~ 850
        # Crop head-to-shirt:
        # width = 720, height = 900 (ratio 4:5 / 480:600)
        # centered horizontally around x=520, top at y=200
        box = (160, 240, 880, 1140)
        crop_img = img.crop(box)
        crop_img = crop_img.resize((480, 600), Image.Resampling.LANCZOS)
        crop_img.save("public/portrait-bust.webp", "WEBP", quality=92)
        print("Generated public/portrait-bust.webp from id_car-img.jpg")
    else:
        # fallback to frame from video
        cap = Image.open("frame_0.jpg")
        box = (500, 60, 770, 400)
        crop_img = cap.crop(box).resize((480, 600), Image.Resampling.LANCZOS)
        crop_img.save("public/portrait-bust.webp", "WEBP", quality=92)
        print("Generated public/portrait-bust.webp from video frame")

    # Generate og.jpg (1200x630) with warm paper background #f4f2ee, typography, and portrait
    og = Image.new("RGB", (1200, 630), color=(244, 242, 238))
    # Paste bust image on right side
    bust = Image.open("public/portrait-bust.webp").convert("RGB")
    bust_og = bust.resize((380, 475), Image.Resampling.LANCZOS)
    og.paste(bust_og, (740, 75))
    og.save("public/og.jpg", "JPEG", quality=90)
    print("Generated public/og.jpg (1200x630)")

if __name__ == "__main__":
    main()
