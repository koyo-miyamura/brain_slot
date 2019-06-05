package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

const targetDirPath = "./slot_images"

var count = 1

func main() {
	filepath.Walk(targetDirPath, visit)
}

func visit(path string, info os.FileInfo, err error) error {
	if path != targetDirPath {
		renamePath(path)
	}
	return nil
}

func renamePath(path string) {
	fileDir := filepath.Dir(path)
	fileExt := filepath.Ext(path)
	fileName := strings.TrimSuffix(filepath.Base(path), fileExt)
	_, err := os.Stat(fmt.Sprintf("%s/%s%s", fileDir, fileName, fileExt))
	if err != nil {
		fmt.Print(path)
		return
	}
	// 同名ファイルがあると上書きされるので2回実行すると危険
	if err = os.Rename(path, fmt.Sprintf("%s/image_%d%s", fileDir, count, fileExt)); err != nil {
		fmt.Println(err)
		return
	}

	count++
}
