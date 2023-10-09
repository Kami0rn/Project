package entity

import (
	"gorm.io/gorm"
)

type OrderFood struct {

	gorm.Model

	//FK
	OrderID *uint
	Order []Order `gorm:"foreignKey:OrderID"`

	FoodID *uint
	Food []Food `gorm:"foreignKey:FoodID"`

}