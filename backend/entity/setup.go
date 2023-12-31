package entity


import (

	"gorm.io/driver/sqlite"

	"gorm.io/gorm"

)


var db *gorm.DB


func DB() *gorm.DB {

	return db

}


func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("SoyJuuProject"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema

	database.AutoMigrate(
		&Customer{},

		&Food{}, 


		&Order{}, 

		&Rider{},
		&Payment{},

		&Wallet{},
		&TopUp{},

		&Bank{},
		
	 )

	db = database

}