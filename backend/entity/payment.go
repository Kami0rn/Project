package entity

import (
	"time"
	"gorm.io/gorm"
)

type Payment struct {

	gorm.Model

	IsPaid bool

	Method string

	DateTime time.Time

	// FK

	CustomerID *uint
	Customer Customer `gorm:"foreignKey:CustomerID"`

}