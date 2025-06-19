Feature: Cart Data Persistence and Storage
  As a customer
  I want my cart contents to be saved
  So that I don't lose my selected items when I return to the website

  Background:
    Given I am using the OctoCAT Supply website
    And localStorage is available in my browser

  Scenario: Cart data is saved to localStorage when items are added
    Given my cart is empty
    When I add "2" units of "Solar Panel" to my cart
    Then the cart data should be saved in localStorage
    And localStorage should contain the product details
    And localStorage should contain the correct quantity

  Scenario: Cart data is loaded from localStorage on page load
    Given localStorage contains cart data with "3" units of "Field Beacon"
    When I visit the website
    Then my cart should display "3" items in the badge
    And the cart should contain "3" units of "Field Beacon"

  Scenario: Cart data persists across browser refresh
    Given my cart contains:
      | Product Name    | Quantity |
      | Solar Panel     | 2        |
      | Field Beacon    | 1        |
    When I refresh the browser page
    Then my cart should still contain the same products
    And the cart badge should display "3"

  Scenario: Cart data persists across browser tabs
    Given my cart contains "2" units of "Solar Panel"
    When I open the website in a new browser tab
    Then the cart in the new tab should show "2" items
    And both tabs should display the same cart contents

  Scenario: Cart updates are synchronized across tabs
    Given I have the website open in two browser tabs
    And my cart contains "1" unit of "Solar Panel"
    When I add "1" more unit in the first tab
    And I switch to the second tab
    Then the second tab should show updated cart contents
    # Note: This may require additional implementation for real-time sync

  Scenario: Invalid cart data is handled gracefully
    Given localStorage contains corrupted cart data
    When I visit the website
    Then the cart should be empty
    And no errors should be displayed to the user
    And the corrupted data should be cleared

  Scenario: Cart data validation on load
    Given localStorage contains cart data with invalid product structure
    When the website loads the cart data
    Then invalid items should be filtered out
    And only valid items should be loaded into the cart
    And the localStorage should be updated with cleaned data

  Scenario: localStorage quota exceeded handling
    Given localStorage is near its storage limit
    When I try to add items to my cart
    Then the system should handle the quota exceeded error
    And I should see an appropriate warning message
    And the cart should still function with existing items

  Scenario: Cart data cleanup for removed products
    Given my cart contains products that no longer exist in the system
    When I visit the cart page
    Then unavailable products should be identified
    And I should be notified about unavailable items
    And the cart totals should exclude unavailable products

  Scenario: Cart data structure validation
    Given cart data is being saved to localStorage
    Then the data should include all required fields:
      | Field      | Type   | Required |
      | productId  | number | Yes      |
      | name       | string | Yes      |
      | price      | number | Yes      |
      | quantity   | number | Yes      |
      | imgName    | string | Yes      |
      | unit       | string | Yes      |

  Scenario: Clear cart data from storage
    Given my cart contains multiple items
    When I clear my cart
    Then the cart data should be removed from localStorage
    And subsequent page loads should show an empty cart

  Scenario: Cart data size optimization
    Given I have many items in my cart
    When the cart data is saved to localStorage
    Then the data should be stored efficiently
    And the storage size should be minimized

  Scenario: Concurrent cart modifications
    Given I am adding items to my cart rapidly
    When multiple add-to-cart operations happen quickly
    Then all operations should be processed correctly
    And the final cart state should be accurate
    And no cart data should be lost

  Scenario: Browser privacy mode handling
    Given I am using the browser in private/incognito mode
    When I add items to my cart
    Then the cart should work normally within the session
    And cart data should not persist after the session ends

  Scenario: Cart data migration for schema changes
    Given localStorage contains cart data in an older format
    When the website loads with a newer cart schema
    Then the old data should be migrated to the new format
    Or the old data should be safely cleared if migration is not possible
