package entity

import "gorm.io/gorm"

type Customer struct {
	
	gorm.Model

	FirstName string 

	LastName string 

	UserName string `gorm:"uniqueIndex"`

	Password string 

	Address string 

	Email string `gorm:"uniqueIndex;check:email LIKE '%.com'"`

	Phone string 

	Gender    string `gorm:"check:gender IN ('male', 'female', 'other')"`

	//FK export
	Orders []Order `gorm:"foreignKey:CustomerID"`

	Deliveries []Delivery `gorm:"foreignKey:CustomerID"`

	Payments []Payment `gorm:"foreignKey:CustomerID"`



}