package entity

import (
	"gorm.io/gorm"
)

type Food struct {

	gorm.Model

	description string

	price float32

}