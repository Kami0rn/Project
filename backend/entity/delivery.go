package entity

import (
	"gorm.io/gorm"
)

type Delivery struct {

	gorm.Model

	CustomerID *uint
	Customer Customer `gorm:"foreignKey:CustomerID"`

	OrderID *uint
	Order Order `gorm:"foreignKey:OrderID"`

	RiderID *uint	
	Rider Rider `gorm:"foreignKey:RiderID"`

	//FK export
	// Histories []History `gorm:"foreignKey:DeliveryID"`

}