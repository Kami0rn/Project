package entity

import (
	"time"

	"gorm.io/gorm"
)

type History struct {

	gorm.Model
	
	DateTimeHistory time.Time `gorm:"autoCreateTime:true"`

	//FK
	DeliveryID *uint
	Delivery Delivery `gorm:"foreignKey:DeliveryID"`

	//FK export
	Salaries []Salary `gorm:"foreignKey:HistoryID"`

}


//https://gobyexample.com/time