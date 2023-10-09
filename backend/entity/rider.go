package entity

import (
	"gorm.io/gorm"
)

type Rider struct {

	gorm.Model

	FirstName string

	LastName string

	UserName string `gorm:"uniqueIndex"`

	Password string

	Email string `gorm:"uniqueIndex"`

	Phone int32

	License string

	//FK export

	Deliveries []Delivery `gorm:"foreignKey:RiderID"`

}

	

