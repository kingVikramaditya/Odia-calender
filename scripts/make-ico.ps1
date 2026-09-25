Add-Type -AssemblyName System.Drawing
$sizes = @(256, 128, 64, 48, 32, 16)
$sourcePath = "e:\Odia calender\Odia-calender\public\app-icon.png"
$destPath = "e:\Odia calender\Odia-calender\public\icon.ico"

$srcImg = [System.Drawing.Image]::FromFile($sourcePath)
$pngStreams = @()

foreach ($s in $sizes) {
    $bmp = New-Object System.Drawing.Bitmap($s, $s)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.DrawImage($srcImg, 0, 0, $s, $s)
    $g.Dispose()

    $ms = New-Object System.IO.MemoryStream
    $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    $pngStreams += ,@($s, $ms.ToArray())
    $ms.Dispose()
}
$srcImg.Dispose()

if (Test-Path $destPath) {
    Remove-Item $destPath -Force
}

$fs = [System.IO.File]::Create($destPath)
$bw = New-Object System.IO.BinaryWriter($fs)

# Header
$bw.Write([uint16]0) # Reserved
$bw.Write([uint16]1) # Type (1 = ICO)
$bw.Write([uint16]$sizes.Count) # Image count

# Calculate initial offset for image data (6 header + 16 per directory entry)
$offset = 6 + ($sizes.Count * 16)

foreach ($item in $pngStreams) {
    $sz = $item[0]
    $bytes = $item[1]
    $w = if ($sz -ge 256) { [byte]0 } else { [byte]$sz }
    $h = if ($sz -ge 256) { [byte]0 } else { [byte]$sz }
    $bw.Write($w)
    $bw.Write($h)
    $bw.Write([byte]0) # Palette
    $bw.Write([byte]0) # Reserved
    $bw.Write([uint16]1) # Color planes
    $bw.Write([uint16]32) # Bits per pixel
    $bw.Write([uint32]$bytes.Length) # Image data size
    $bw.Write([uint32]$offset) # Image data offset
    $offset += $bytes.Length
}

# Write PNG byte arrays
foreach ($item in $pngStreams) {
    $bw.Write($item[1])
}

$bw.Close()
$fs.Close()

$finalLength = (Get-Item $destPath).Length
Write-Host "Generated multi-res icon.ico successfully! File size: $finalLength bytes"
