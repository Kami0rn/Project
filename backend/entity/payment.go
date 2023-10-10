package entity

import (

	"gorm.io/gorm"
)

type Payment struct {

	gorm.Model

	IsPaid bool

	Method string



	// FK

	CustomerID *uint
	Customer Customer `gorm:"foreignKey:CustomerID"`

}

type Bank struct {

	gorm.Model

	BankName string `gorm:"not null"`

	AccountNumber string `gorm:"not null"`

	AccountHolder string `gorm:"not null"`

	//FK
	PaymentID *uint
	Payment Payment `gorm:"foreignKey:PaymentID"`

}

type Card struct {

	gorm.Model

	CardNumber string `gorm:"not null"`

	CardHolder string `gorm:"not null"`

	ExpiredDate string `gorm:"not null"`

	AuditNumber string `gorm:"not null"`

	CardType string `gorm:"not null"`

	//FK
	PaymentID *uint
	Payment Payment `gorm:"foreignKey:PaymentID"`

}



type PayAtDelivery struct {

	gorm.Model

	//FK
	PaymentID *uint
	Payment Payment `gorm:"foreignKey:PaymentID"`

}


