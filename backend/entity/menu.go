package entity

import (
	"gorm.io/gorm"
)

type Menu struct {

	gorm.Model

	Title string `gorm:"not null"`

	Description string 
	//FK export
	FoodMenus []FoodMenu `gorm:"foreignKey:MenuID"`
}