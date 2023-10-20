package main

import (
	"github.com/gin-gonic/gin"

	"github.com/Kami0rn/SoyJuuProject/controller"

	"github.com/Kami0rn/SoyJuuProject/entity"
)

const PORT = "8081"


func main() {

	entity.SetupDatabase()

	r := gin.Default()



	r.Use(CORSMiddleware())

	// Customer Routes

	r.GET("/customers", controller.ListCustomers)

	r.GET("/customers/:hashed_password", controller.GetCustomerByHash)

	r.GET("/customer/:id", controller.GetCustomer)

	r.GET("/customer/hash/:hashed_password", controller.GetCustomerByHash)

	r.POST("/customers", controller.CreateCustomer)

	r.PATCH("/customers", controller.UpdateCustomer)

	r.DELETE("/customers/:id", controller.DeleteCustomer)


	// Customer Routes

	r.GET("/riders", controller.ListRiders)

	r.GET("/riders/:hashed_password", controller.GetRiderByHash)

	r.GET("/rider/:id", controller.GetRider)

	r.GET("/rider/hash/:hashed_password", controller.GetRiderByHash)

	r.POST("/riders", controller.CreateRider)

	r.PATCH("/riders", controller.UpdateRider)

	r.DELETE("/riders/:id", controller.DeleteRider)


	// Payment Routes
	// r.GET("/payments", controller.ListPayments)

	// r.GET("/payment/:id", controller.GetPayment)

	// r.POST("/payments", controller.CreatePayment)

	// r.PATCH("/payments", controller.UpdatePayment)

	// r.DELETE("/payments/:id", controller.DeletePayment)


	//Food Routes

	r.GET("/foods", controller.ListFoods)
	r.GET("/food/:id", controller.GetFood)
	r.GET("/foods/:hashed_password", controller.ListFoods)
	r.POST("/foods", controller.CreateFood)
	r.PATCH("/food", controller.UpdateFood)
	r.DELETE("/foods/:id", controller.DeleteFood)

	// r.GET("/orders", controller.ListPayments)

	// r.GET("/order/:id", controller.GetPayment)

	// r.POST("/orders", controller.CreatePayment)

	// r.PATCH("/orders", controller.UpdatePayment)

	// r.DELETE("/orders/:id", controller.DeletePayment)
	r.GET("/orders", controller.ListOrders)
	r.GET("/orders/:id", controller.GetOrder)
	r.GET("/orders/:hashed_password", controller.ListOrders)
	r.POST("/orders", controller.CreateOrder)
	r.PATCH("/orders", controller.UpdateOrder)
	r.DELETE("/orders/:id", controller.DeleteOrder)
	r.GET("/orders/customer/:customerID", controller.GetOrdersByCustomerID)
	
	
	// State Routes

	r.GET("/states", controller.ListStates)
	r.GET("/states/:id", controller.GetState)
	// Run the server
	r.GET("/ordersdetail", controller.ListOrdersDetail)

	// Run the server

	r.GET("/State/:id", controller.GetState)
	r.GET("/states/:hashed_password", controller.ListStates)


	r.Run("localhost:" + PORT)


}


func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT ,DELETE ,PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}