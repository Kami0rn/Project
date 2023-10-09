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
		// &Delivery{}, 
		&Food{}, 
		&FoodMenu{}, 
		&History{}, 
		&Menu{}, 
		&Order{}, 
		&OrderFood{}, 
		&Rider{},
		// &Payment{},
		// &Salary{},
		// &Wallet{},
	 )

	db = database

}