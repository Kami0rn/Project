package entity

import (
	"gorm.io/gorm"
)

type Food struct {
	gorm.Model

	FoodName string 
	FoodPrice int 
	Description string 
	Path string 
	Profile  string `gorm:"type:longtext"`
	//FK export
	OrderFoods []OrderFood `gorm:"foreignKey:FoodID"`
	
}