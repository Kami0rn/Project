package controller

import (
	"net/http"

	"github.com/Kami0rn/SoyJuuProject/entity"
	"github.com/gin-gonic/gin"
)

// POST /users
func CreateRider(c *gin.Context) {
	var rider entity.Rider

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&rider); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง Customer
	newRider := entity.Rider{
		FirstName:      rider.FirstName,
		LastName:       rider.LastName,
		UserName:       rider.UserName,
		Password:       rider.Password,
		Email:          rider.Email,
		Phone:          rider.Phone,
		License:        rider.License,
		HashedPassword: rider.HashedPassword,
	}

	// บันทึก
	if err := entity.DB().Create(&newRider).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newRider})
}

// GET /user/:id
func GetRider(c *gin.Context) {
	var rider entity.Rider
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM riders WHERE id = ?", id).Find(&rider).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rider})
}

// GET /users
func ListRiders(c *gin.Context) {
	var riders []entity.Rider
	if err := entity.DB().Raw("SELECT * FROM riders").Find(&riders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": riders})
}

// DELETE /users/:id
func DeleteRider(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM riders WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdateRider(c *gin.Context) {
	var rider entity.Rider
	var result entity.Rider

	if err := c.ShouldBindJSON(&rider); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", rider.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := entity.DB().Save(&rider).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rider})
}

func GetRiderByHash(c *gin.Context) {
    var rider entity.Rider
    hashedPassword := c.Param("hashed_password")

    // Replace this with a proper database query to retrieve the customer by hashed password
    if err := entity.DB().Where("hashed_password = ?", hashedPassword).First(&rider).Error; err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"});
        return;
    }

    c.JSON(http.StatusOK, gin.H{"data": rider});
}
