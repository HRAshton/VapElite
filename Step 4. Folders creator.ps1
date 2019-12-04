$files = Get-ChildItem -Filter "*.rdp";
if ($files[0].Length -eq 0) {
    Write-Host "Wrong folder";
    return;
}

$root = (Get-ChildItem -Filter "*.rdp")[0].DirectoryName;
$target = "$root\out\";
$tgtProg = "$target\Program Files\VapElite\";
$tgtDesk = "$target\Users\Public\Desktop\vap.tpu.ru\";

rmdir $target -Force -Recurse;
mkdir $tgtProg -Force;
mkdir $tgtDesk -Force;

$Shell = New-Object -ComObject ("WScript.Shell");

foreach ($file in $files) {
   $groups = [RegEx]::Match($file.BaseName, "^_(.*?)___(.*?)$").Groups;
   $folder = $groups[1].Value;
   $filename = $groups[2].Value;

   # ProgramFiles
   copy ($file.BaseName + ".rdp") $tgtProg;
   copy ($file.BaseName + ".ico") $tgtProg;
   
   # Desktop
   mkdir "$tgtDesk/$folder/" -Force;
   $Shortcut = $Shell.CreateShortcut("$tgtDesk/$folder/" + $filename.Replace("_", " ") + ".lnk");
   $Shortcut.IconLocation = "C:\Program Files\VapElite\" + $file.BaseName + ".ico";
   $Shortcut.TargetPath = "C:\Program Files\VapElite\" + $file.BaseName + ".rdp";
   $Shortcut.Save();
}
