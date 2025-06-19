Feature: Cart Icon and Badge Display
  As a customer
  I want to see a visual indicator of my cart status in the navigation
  So that I can quickly understand how many items I have and access my cart

  Background:
    Given I am on the OctoCAT Supply website
    And the navigation bar is visible

  Scenario: Cart icon is visible in navigation
    Given I am on any page of the website
    Then I should see a cart icon in the navigation bar
    And the cart icon should be clickable

  Scenario: Empty cart shows no badge
    Given my cart is empty
    When I view the navigation bar
    Then the cart icon should be visible
    But no badge should be displayed on the cart icon

  Scenario: Cart badge appears when items are added
    Given my cart is empty
    When I add "1" product to my cart
    Then the cart icon should display a badge with "1"
    And the badge should have primary color background
    And the badge should have white text

  Scenario: Cart badge updates in real-time
    Given my cart contains "2" items
    And I am viewing the navigation
    When I add "1" more item to my cart
    Then the cart badge should immediately update to show "3"
    And the update should happen without page refresh

  Scenario: Cart badge shows correct count for multiple items
    Given I add the following items to my cart:
      | Product         | Quantity |
      | Solar Panel     | 3        |
      | Field Beacon    | 2        |
      | Power Tool      | 1        |
    When I view the navigation
    Then the cart badge should display "6"

  Scenario: Cart badge displays "99+" for large quantities
    Given my cart contains "150" total items
    When I view the navigation
    Then the cart badge should display "99+"
    And the badge should remain readable

  Scenario: Cart icon navigation functionality
    Given I am on the products page
    And my cart contains items
    When I click on the cart icon
    Then I should be navigated to the cart page "/cart"
    And the cart page should display my cart contents

  Scenario: Cart icon hover effects
    Given I am viewing the navigation
    When I hover over the cart icon
    Then the cart icon should change to primary color
    And the hover effect should be smooth

  Scenario: Cart badge positioning and styling
    Given the cart badge is displayed
    Then the badge should be positioned at the top-right of the cart icon
    And the badge should be circular
    And the badge should not overlap with other navigation elements
    And the badge should be readable on all backgrounds

  Scenario: Cart icon accessibility
    Given I am using the website
    Then the cart icon should have appropriate ARIA labels
    And the cart icon should be keyboard accessible
    And screen readers should announce the cart status

  Scenario: Cart badge persists across page navigation
    Given my cart contains "3" items
    And the cart badge displays "3"
    When I navigate to different pages on the website
    Then the cart badge should continue to display "3"
    And the badge should remain visible on all pages

  Scenario: Cart badge updates when items are removed
    Given my cart contains "5" items
    And the cart badge displays "5"
    When I remove "2" items from my cart
    Then the cart badge should update to display "3"
    And the update should happen immediately

  Scenario: Cart badge disappears when cart becomes empty
    Given my cart contains "1" item
    And the cart badge displays "1"
    When I remove the last item from my cart
    Then the cart badge should disappear
    And only the cart icon should remain visible

  Scenario: Cart icon responsive behavior on mobile
    Given I am viewing the website on a mobile device
    Then the cart icon should remain visible in the mobile navigation
    And the cart badge should be appropriately sized for touch interfaces
    And the cart icon should be easily tappable

  Scenario: Cart icon in different navigation states
    Given I am logged in as a user
    When I view the navigation with login/logout buttons visible
    Then the cart icon should be positioned correctly
    And the cart icon should not interfere with other navigation elements

  Scenario: Cart badge animation (future enhancement)
    Given my cart badge is displaying a count
    When items are added to the cart
    Then the badge count should update smoothly
    And there should be a subtle animation indicating the change
