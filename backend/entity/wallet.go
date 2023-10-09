package entity

import (
	"gorm.io/gorm"
)


type Wallet struct {

	gorm.Model

	Remain float64 `gorm:"not null"`

	//FK

	PaymentID *uint
	Payment []Payment `gorm:"foreignKey:PaymentID"`

	//FK export
	TopUps []TopUp `gorm:"foreignKey:WalletID"`

}

type TopUp struct {

	gorm.Model

	TopUpAmount float64 `gorm:"not null"`

	//FK
	WalletID *uint
	Wallet []Wallet `gorm:"foreignKey:WalletID"`

}