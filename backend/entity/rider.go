package entity

import (
	"gorm.io/gorm"
)

type Rider struct {

	// gorm.Model

	// FirstName string

	// LastName string

	// UserName string `gorm:"uniqueIndex"`

	// Password string

	// Email string `gorm:"uniqueIndex"`

	// Phone int32

	// License string

	// HashedPassword string
	gorm.Model

	UserName string `gorm:"uniqueIndex"`

	FirstName string 

	LastName string 

	Email string `gorm:"uniqueIndex;"`

	License string 

	Phone string 

	Password string 

	HashedPassword string

	//FK export
	

	Deliveries []Delivery `gorm:"foreignKey:RiderID"`

}

	

