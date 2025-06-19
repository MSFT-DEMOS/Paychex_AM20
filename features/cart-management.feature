Feature: Shopping Cart Management
  As a customer
  I want to manage products in my shopping cart
  So that I can review and modify my order before checkout

  Background:
    Given I am on the OctoCAT Supply website
    And products are available in the system

  Scenario: Add a single product to empty cart
    Given I am on the products page
    And my cart is empty
    When I select quantity "2" for "Solar Panel"
    And I click "Add to Cart"
    Then I should see a success message "Added 2 Solar Panel(s) to cart!"
    And the cart icon should display badge "2"
    And the product quantity should reset to "0"

  Scenario: Add multiple different products to cart
    Given I am on the products page
    And my cart is empty
    When I select quantity "1" for "Solar Panel"
    And I click "Add to Cart"
    And I select quantity "3" for "Field Beacon"
    And I click "Add to Cart"
    Then the cart icon should display badge "4"
    And I should see success messages for both products

  Scenario: Add same product multiple times
    Given I am on the products page
    And my cart contains "2" units of "Solar Panel"
    When I select quantity "1" for "Solar Panel"
    And I click "Add to Cart"
    Then the cart icon should display badge "3"
    And the cart should contain "3" units of "Solar Panel"

  Scenario: Attempt to add product with zero quantity
    Given I am on the products page
    When I leave quantity as "0" for "Solar Panel"
    And I click "Add to Cart"
    Then the "Add to Cart" button should be disabled
    And no product should be added to the cart

  Scenario: Cart persists across browser sessions
    Given I have "2" units of "Solar Panel" in my cart
    When I refresh the browser page
    Then the cart icon should still display badge "2"
    And my cart should still contain "2" units of "Solar Panel"

  Scenario: View empty cart page
    Given my cart is empty
    When I click on the cart icon
    Then I should be redirected to the cart page
    And I should see "Your cart is empty" message
    And I should see a "Browse Products" link

  Scenario: View cart with products
    Given my cart contains:
      | Product Name        | Quantity | Unit Price |
      | Solar Panel         | 1        | $89.00     |
      | Euronet Solar Panel | 2        | $89.00     |
    When I click on the cart icon
    Then I should be redirected to the cart page
    And I should see a table with product details
    And I should see "Subtotal: $267.00"
    And I should see "Discount(5%): -$13.35"
    And I should see "Shipping: $10.00"
    And I should see "Grand Total: $263.65"

  Scenario: Update product quantity in cart
    Given I am on the cart page
    And my cart contains "2" units of "Solar Panel"
    When I click the "+" button for "Solar Panel"
    Then the quantity should increase to "3"
    And the line total should update to "$267.00"
    And the grand total should recalculate automatically

  Scenario: Decrease product quantity in cart
    Given I am on the cart page
    And my cart contains "3" units of "Solar Panel"
    When I click the "-" button for "Solar Panel"
    Then the quantity should decrease to "2"
    And the line total should update to "$178.00"
    And the grand total should recalculate automatically

  Scenario: Remove product by decreasing quantity to zero
    Given I am on the cart page
    And my cart contains "1" unit of "Solar Panel"
    When I click the "-" button for "Solar Panel"
    Then the product should be removed from the cart
    And I should see "Your cart is empty" message

  Scenario: Remove product using delete button
    Given I am on the cart page
    And my cart contains "3" units of "Solar Panel"
    When I click the remove button for "Solar Panel"
    Then the product should be removed from the cart
    And the cart totals should recalculate

  Scenario: Apply coupon code (UI only)
    Given I am on the cart page
    And my cart contains products
    When I enter "SAVE10" in the coupon code field
    And I click "Apply Coupon"
    Then I should see a confirmation that the action was attempted
    # Note: This is UI-only functionality as specified

  Scenario: Update cart button feedback
    Given I am on the cart page
    And my cart contains products
    When I click "Update Cart"
    Then I should see "Cart updated successfully!" message

  Scenario: Proceed to checkout (mock)
    Given I am on the cart page
    And my cart contains products
    When I click "Proceed to Checkout"
    Then I should see "Proceeding to checkout... (This is a demo)" message

  Scenario: Cart calculations with discount and shipping
    Given my cart contains products with subtotal "$300.00"
    When I view the cart page
    Then I should see "Discount(5%): -$15.00"
    And I should see "Shipping: $10.00"
    And I should see "Grand Total: $295.00"

  Scenario: Cart badge displays correct count for large quantities
    Given my cart contains "150" total items across multiple products
    When I view the navigation
    Then the cart icon badge should display "99+"

  Scenario: Error handling for cart operations
    Given there is a localStorage error
    When I try to add a product to cart
    Then the system should handle the error gracefully
    And I should see an appropriate error message
