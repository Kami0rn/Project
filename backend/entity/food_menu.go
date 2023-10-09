package entity

import (
	"gorm.io/gorm"
)

type FoodMenu struct {

	gorm.Model

	//FK
	FoodID *uint
	Food Food `gorm:"foreignKey:FoodID"`

	MenuID *uint
	Menu Menu `gorm:"foreignKey:MenuID"`

}
