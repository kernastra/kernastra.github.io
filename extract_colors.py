#!/usr/bin/env python3
"""
Color Palette Extractor for CosmoDrive Logo
Extracts dominant colors from logo.png and generates CSS color variables
"""

import os
import sys
from PIL import Image
import colorsys
from collections import Counter
import re

def rgb_to_hex(rgb):
    """Convert RGB tuple to hex color code"""
    return f"#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"

def get_dominant_colors(image_path, num_colors=8):
    """Extract dominant colors from an image"""
    try:
        # Open and convert image
        image = Image.open(image_path)
        image = image.convert('RGBA')
        
        # Resize for faster processing
        image = image.resize((150, 150))
        
        # Get all pixels
        pixels = list(image.getdata())
        
        # Filter out transparent pixels and very light/dark colors
        filtered_pixels = []
        for pixel in pixels:
            r, g, b, a = pixel
            # Skip transparent pixels
            if a < 128:
                continue
            # Skip very light or very dark colors
            brightness = (r + g + b) / 3
            if brightness < 30 or brightness > 225:
                continue
            filtered_pixels.append((r, g, b))
        
        if not filtered_pixels:
            return None
        
        # Count color frequency
        color_count = Counter(filtered_pixels)
        
        # Get most common colors
        dominant_colors = color_count.most_common(num_colors)
        
        return [color for color, count in dominant_colors]
    
    except Exception as e:
        print(f"Error processing image: {e}")
        return None

def analyze_colors(colors):
    """Analyze colors and categorize them for website use"""
    if not colors:
        return None
    
    color_analysis = {
        'primary': None,
        'secondary': None,
        'accent': None,
        'background_dark': None,
        'background_medium': None,
        'text_light': None
    }
    
    # Convert to HSV for better analysis
    hsv_colors = []
    for rgb in colors:
        r, g, b = [x/255.0 for x in rgb]
        h, s, v = colorsys.rgb_to_hsv(r, g, b)
        hsv_colors.append((h, s, v, rgb))
    
    # Sort by saturation and value for categorization
    saturated_colors = [c for c in hsv_colors if c[1] > 0.3 and c[2] > 0.3]
    
    if saturated_colors:
        # Primary: Most saturated, vibrant color
        primary_candidates = sorted(saturated_colors, key=lambda x: x[1] * x[2], reverse=True)
        color_analysis['primary'] = primary_candidates[0][3] if primary_candidates else colors[0]
        
        # Secondary: Different hue from primary
        if len(primary_candidates) > 1:
            primary_hue = primary_candidates[0][0]
            secondary_candidates = [c for c in primary_candidates[1:] 
                                  if abs(c[0] - primary_hue) > 0.1 or abs(c[0] - primary_hue) < 0.9]
            color_analysis['secondary'] = secondary_candidates[0][3] if secondary_candidates else primary_candidates[1][3]
        
        # Accent: Complementary or triadic color
        if len(saturated_colors) > 2:
            color_analysis['accent'] = saturated_colors[2][3]
    
    # Use original colors if no saturated colors found
    if not color_analysis['primary']:
        color_analysis['primary'] = colors[0]
    if not color_analysis['secondary']:
        color_analysis['secondary'] = colors[1] if len(colors) > 1 else colors[0]
    if not color_analysis['accent']:
        color_analysis['accent'] = colors[2] if len(colors) > 2 else colors[0]
    
    return color_analysis

def generate_color_variants(base_color):
    """Generate darker and lighter variants of a base color"""
    r, g, b = base_color
    
    # Convert to HSV for manipulation
    h, s, v = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
    
    # Generate variants
    variants = {
        'base': base_color,
        'dark': tuple(int(x * 255) for x in colorsys.hsv_to_rgb(h, s, max(0, v - 0.3))),
        'darker': tuple(int(x * 255) for x in colorsys.hsv_to_rgb(h, s, max(0, v - 0.5))),
        'light': tuple(int(x * 255) for x in colorsys.hsv_to_rgb(h, max(0, s - 0.2), min(1, v + 0.2))),
        'lighter': tuple(int(x * 255) for x in colorsys.hsv_to_rgb(h, max(0, s - 0.4), min(1, v + 0.4)))
    }
    
    return variants

def generate_css_variables(color_analysis):
    """Generate CSS custom properties from color analysis"""
    if not color_analysis:
        return None
    
    primary = color_analysis['primary']
    secondary = color_analysis['secondary'] or primary
    accent = color_analysis['accent'] or primary
    
    # Generate variants
    primary_variants = generate_color_variants(primary)
    secondary_variants = generate_color_variants(secondary)
    
    css_vars = f"""    /* Color Palette - Generated from Logo */
    --primary-color: {rgb_to_hex(primary)};
    --primary-light: {rgb_to_hex(primary_variants['light'])};
    --primary-dark: {rgb_to_hex(primary_variants['dark'])};
    --secondary-color: {rgb_to_hex(secondary)};
    --secondary-light: {rgb_to_hex(secondary_variants['light'])};
    --accent-color: {rgb_to_hex(accent)};
    --background-primary: {rgb_to_hex(primary_variants['darker'])};
    --background-secondary: {rgb_to_hex(primary_variants['dark'])};
    --background-tertiary: {rgb_to_hex(primary_variants['light'])};
    --text-primary: #ffffff;
    --text-secondary: #e2e8f0;
    --text-muted: #94a3b8;
    --border-color: {rgb_to_hex(primary_variants['light'])};
    --gradient-cosmic: linear-gradient(135deg, {rgb_to_hex(primary)} 0%, {rgb_to_hex(secondary)} 100%);
    --gradient-purple: linear-gradient(135deg, {rgb_to_hex(secondary)} 0%, {rgb_to_hex(primary)} 100%);
    --gradient-blue: linear-gradient(135deg, {rgb_to_hex(accent)} 0%, {rgb_to_hex(primary)} 100%);"""
    
    return css_vars

def main():
    logo_path = "logo.png"
    
    if not os.path.exists(logo_path):
        print("❌ logo.png not found in current directory")
        return
    
    print("🎨 Extracting colors from logo.png...")
    
    # Extract dominant colors
    colors = get_dominant_colors(logo_path)
    
    if not colors:
        print("❌ Could not extract colors from logo")
        return
    
    print(f"✅ Extracted {len(colors)} dominant colors:")
    for i, color in enumerate(colors[:5]):
        hex_color = rgb_to_hex(color)
        print(f"   {i+1}. {hex_color} - RGB{color}")
    
    # Analyze colors for website use
    color_analysis = analyze_colors(colors)
    
    if color_analysis:
        print("\n🎯 Color assignments:")
        if color_analysis['primary']:
            print(f"   Primary: {rgb_to_hex(color_analysis['primary'])}")
        if color_analysis['secondary']:
            print(f"   Secondary: {rgb_to_hex(color_analysis['secondary'])}")
        if color_analysis['accent']:
            print(f"   Accent: {rgb_to_hex(color_analysis['accent'])}")
    
    # Generate CSS
    css_variables = generate_css_variables(color_analysis)
    
    if css_variables:
        print(f"\n📝 Generated CSS variables:")
        print(css_variables)
        
        # Save to file
        with open("logo_colors.css", "w") as f:
            f.write(":root {\n")
            f.write(css_variables)
            f.write("\n}\n")
        
        print(f"\n💾 CSS variables saved to logo_colors.css")
        print("✨ Copy these variables to replace the color palette in your styles.css file!")
    
    return css_variables

if __name__ == "__main__":
    main()
