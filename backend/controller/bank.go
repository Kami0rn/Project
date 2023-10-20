
package controller

import (
	"net/http"

	"github.com/Kami0rn/SoyJuuProject/entity"
	"github.com/gin-gonic/gin"
)
// POST /banks
func CreateBank(c *gin.Context) {
    var bank entity.Bank

    // Bind the JSON data into the 'bank' variable
    if err := c.ShouldBindJSON(&bank); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Create a new Bank record
    newBank := entity.Bank{
        BankName:      bank.BankName,
        AccountNumber: bank.AccountNumber,
        AccountHolder: bank.AccountHolder,

    }

    // Save the new Bank record
    if err := entity.DB().Create(&newBank).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": newBank})
}

// GET /banks/:id
func GetBank(c *gin.Context) {
    var bank entity.Bank
    id := c.Param("id")

    // Query the database for the Bank record with the given ID
    if err := entity.DB().Raw("SELECT * FROM banks WHERE id = ?", id).Find(&bank).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": bank})
}

// GET /banks
func ListBanks(c *gin.Context) {
    var banks []entity.Bank

    // Query the database for all Bank records
    if err := entity.DB().Raw("SELECT * FROM banks").Find(&banks).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": banks})
}

// DELETE /banks/:id
func DeleteBank(c *gin.Context) {
    id := c.Param("id")

    // Delete the Bank record with the given ID
    if tx := entity.DB().Exec("DELETE FROM banks WHERE id = ?", id); tx.RowsAffected == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "bank not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /banks
func UpdateBank(c *gin.Context) {
    var bank entity.Bank
    var result entity.Bank

    if err := c.ShouldBindJSON(&bank); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Find the Bank record by ID
    if tx := entity.DB().Where("id = ?", bank.ID).First(&result); tx.RowsAffected == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "bank not found"})
        return
    }

    // Update the Bank record
    if err := entity.DB().Save(&bank).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": bank})
}
