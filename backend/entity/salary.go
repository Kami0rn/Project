package entity

import (
	"gorm.io/gorm"

)

type Salary struct {

	gorm.Model

	Amount float64 

	Point float32


	//FK 
	HistoryID *uint
	History []History `gorm:"foreignKey:HistoryID"`

	RiderID *uint
	Rider []Rider `gorm:"foreignKey:RiderID"`

}