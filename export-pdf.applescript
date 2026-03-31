on run argv
    set inputURL to item 1 of argv
    set outputPath to item 2 of argv
    set outputDir to do shell script "dirname " & quoted form of outputPath
    set outputFile to (do shell script "basename " & quoted form of outputPath & " .pdf") & ".pdf"

    tell application "Safari"
        activate
        make new document with properties {URL:inputURL}
        delay 5
    end tell

    tell application "System Events"
        tell process "Safari"
            set frontmost to true
            delay 1

            -- 打开导出PDF对话框
            click menu item "导出为PDF…" of menu "文件" of menu bar 1
            delay 2

            -- 设置文件名
            set value of text field "保存为：" of splitter group 1 of sheet 1 of window 1 to outputFile

            -- 前往指定目录
            keystroke "g" using {command down, shift down}
            delay 1.5
            set value of text field 1 of sheet 1 of sheet 1 of window 1 to outputDir
            keystroke return
            delay 1

            -- 保存
            click button "保存" of splitter group 1 of sheet 1 of window 1
            delay 1.5

            -- 处理覆盖确认弹窗（如果存在）
            if exists sheet 1 of sheet 1 of window 1 then
                if exists button "替换" of sheet 1 of sheet 1 of window 1 then
                    click button "替换" of sheet 1 of sheet 1 of window 1
                end if
            end if

            -- 等待对话框关闭
            repeat until not (exists sheet 1 of window 1)
                delay 0.3
            end repeat
        end tell
    end tell

    tell application "Safari"
        close front document
    end tell

end run
