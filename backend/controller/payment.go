package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Kami0rn/SoyJuuProject/entity"
)

// POST /users
func CreatePayment(c *gin.Context) {
	var payment entity.Payment
	var customer entity.Customer

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา customer ด้วย id
	if tx := entity.DB().Where("id = ?", payment.CustomerID).First(&customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "customer not found"})
		return
	}

	// สร้าง User
	p := entity.Payment{
		Customer:    customer,         // โยงความสัมพันธ์กับ Entity Gender
		IsPaid: payment.IsPaid, // ตั้งค่าฟิลด์ FirstName // ตั้งค่าฟิลด์ LastName
		Method:     payment.Method,     // ตั้งค่าฟิลด์ Email

	}

	// บันทึก
	if err := entity.DB().Create(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": p})
}

// GET /user/:id
func GetPayment(c *gin.Context) {
	var payment entity.Payment
	id := c.Param("id")
	if err := entity.DB().Preload("Customer").Raw("SELECT * FROM payments WHERE id = ?", id).Find(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// GET /users
func ListPayments(c *gin.Context) {
	var payments []entity.Payment
	if err := entity.DB().Preload("Customer").Raw("SELECT * FROM payments").Find(&payments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payments})
}

// DELETE /users/:id
func DeletePayment(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM payments WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdatePayment(c *gin.Context) {
	var payment entity.Payment
	var result entity.Payment

	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", payment.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := entity.DB().Save(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}
