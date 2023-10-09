package entity

import (
	"gorm.io/gorm"
)

type Food struct {
	gorm.Model

	FoodName string `gorm:"not null"`

	FoodPrice float32 `gorm:"not null"`

	Description string 

	Path string `gorm:"not null"`


	//FK export
	OrderFoods []OrderFood `gorm:"foreignKey:FoodID"`

	FoodMenus []FoodMenu `gorm:"foreignKey:FoodID"`
}