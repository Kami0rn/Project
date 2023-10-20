package entity

import (


	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	FoodID *uint
	Food   Food `gorm:"references:id"`
	CustomerID *uint
	Customer   Customer `gorm:"references:id"`
	StateID *uint
	State State `gorm:"references:id"`

}

type State struct {
	gorm.Model
	StateName string
	Order []Order `gorm:"foreignKey:StateID"`
 }


//https://github.com/edwindvinas/shopping-cart-api/blob/master/cart/ShoppingCart.go