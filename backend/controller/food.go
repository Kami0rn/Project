package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/Kami0rn/SoyJuuProject/entity"
)



func CreateFood(c *gin.Context) {

	var food entity.Food
	
	if err := c.ShouldBindJSON(&food); err != nil {
	
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	
	return
	
	}
	
	if err := entity.DB().Create(&food).Error; err != nil {
	
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	
	return
	
	}
	
	c.JSON(http.StatusOK, gin.H{"data": food})
	
	} 
	
	// GET /user/:id

func GetFood(c *gin.Context) {

	var food entity.Food
	
	id := c.Param("id")
	
	if err := entity.DB().Raw("SELECT * FROM foods WHERE id = ?", id).Scan(&food).Error; err != nil {
	
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	
	return
	
	}
	
	c.JSON(http.StatusOK, gin.H{"data": food})
	
	}
	// GET /users

func ListFoods(c *gin.Context) {

	var foods []entity.Food
	
	if err := entity.DB().Raw("SELECT * FROM foods").Scan(&foods).Error; err != nil {
	
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	
	return
	
	}
	
	c.JSON(http.StatusOK, gin.H{"data": foods})
	
	}

	// DELETE /users/:id

func DeleteFood(c *gin.Context) {

	id := c.Param("id")
	
	if tx := entity.DB().Exec("DELETE FROM foods WHERE id = ?", id); tx.RowsAffected == 0 {
	
	c.JSON(http.StatusBadRequest, gin.H{"error": "food not found"})
	
	return
	
	}
	
	c.JSON(http.StatusOK, gin.H{"data": id})
	
	}

	// PATCH /users

func UpdateFood(c *gin.Context) {

	var food entity.Food
	
	if err := c.ShouldBindJSON(&food); err != nil {
	
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	
	return
	
	}
	
	
	if tx := entity.DB().Where("id = ?", food.ID).First(&food); tx.RowsAffected == 0 {
	
	c.JSON(http.StatusBadRequest, gin.H{"error": "food not found"})
	
	return
	
	}
	
	
	if err := entity.DB().Save(&food).Error; err != nil {
	
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	
	return
	
	}
	
	c.JSON(http.StatusOK, gin.H{"data": food})
	
	}