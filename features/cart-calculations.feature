Feature: Cart Calculations and Pricing
  As a customer
  I want accurate price calculations in my cart
  So that I know exactly how much I will pay before checkout

  Background:
    Given I am on the OctoCAT Supply website
    And the cart pricing system is active

  Scenario: Calculate line total for single product
    Given I have "3" units of "Solar Panel" at "$89.00" each in my cart
    When I view the cart page
    Then the line total should display "$267.00"

  Scenario: Calculate subtotal for multiple products
    Given my cart contains:
      | Product Name        | Quantity | Unit Price |
      | Solar Panel         | 1        | $89.00     |
      | Euronet Solar Panel | 2        | $89.00     |
    When I view the cart page
    Then the subtotal should display "$267.00"

  Scenario: Apply 5% discount calculation
    Given my cart has a subtotal of "$267.00"
    When I view the order summary
    Then the discount should display "Discount(5%): -$13.35"
    And the discount should be calculated as 5% of the subtotal

  Scenario: Calculate shipping cost for non-empty cart
    Given my cart contains at least one item
    When I view the order summary
    Then the shipping cost should display "$10.00"

  Scenario: No shipping cost for empty cart
    Given my cart is empty
    When I view the cart calculations
    Then the shipping cost should be "$0.00"

  Scenario: Calculate grand total
    Given my cart has:
      | Subtotal    | $267.00 |
      | Discount(5%)| -$13.35 |
      | Shipping    | $10.00  |
    When I view the order summary
    Then the grand total should display "$263.65"
    And the calculation should be: subtotal - discount + shipping

  Scenario: Recalculate totals when quantity increases
    Given my cart contains "1" unit of "Solar Panel" at "$89.00"
    And the current subtotal is "$89.00"
    When I increase the quantity to "2"
    Then the line total should update to "$178.00"
    And the subtotal should update to "$178.00"
    And the discount should update to "-$8.90"
    And the grand total should update to "$179.10"

  Scenario: Recalculate totals when quantity decreases
    Given my cart contains "3" units of "Solar Panel" at "$89.00"
    And the current subtotal is "$267.00"
    When I decrease the quantity to "2"
    Then the line total should update to "$178.00"
    And the subtotal should update to "$178.00"
    And the discount should update to "-$8.90"
    And the grand total should update to "$179.10"

  Scenario: Recalculate totals when product is removed
    Given my cart contains:
      | Product Name        | Quantity | Unit Price |
      | Solar Panel         | 1        | $89.00     |
      | Euronet Solar Panel | 1        | $89.00     |
    And the current subtotal is "$178.00"
    When I remove "Solar Panel" from the cart
    Then the subtotal should update to "$89.00"
    And the discount should update to "-$4.45"
    And the grand total should update to "$94.55"

  Scenario: Price formatting consistency
    Given I have various products in my cart
    When I view all price displays
    Then all prices should be formatted as "$XX.XX"
    And all calculations should show 2 decimal places
    And negative amounts should be clearly indicated

  Scenario: Zero total handling
    Given my cart becomes empty
    When I view the cart calculations
    Then the subtotal should display "$0.00"
    And the discount should display "-$0.00"
    And the shipping should display "$0.00"
    And the grand total should display "$0.00"

  Scenario: Large quantity calculations
    Given I have "100" units of "Solar Panel" at "$89.00" each
    When I view the cart calculations
    Then the line total should display "$8,900.00"
    And the subtotal should display "$8,900.00"
    And the discount should display "-$445.00"
    And the grand total should display "$8,465.00"

  Scenario: Decimal price handling
    Given I have products with price "$12.99" in my cart
    When I add "3" units
    Then the line total should display "$38.97"
    And all calculations should maintain precision

  Scenario: Real-time calculation updates
    Given I am on the cart page
    When I modify any quantity
    Then all affected calculations should update immediately
    And I should not need to refresh the page
    And the updates should be smooth and responsive

  Scenario: Calculation accuracy verification
    Given my cart contains multiple items with different prices
    When I manually verify the calculations
    Then the line totals should equal quantity × unit price
    And the subtotal should equal the sum of all line totals
    And the discount should equal 5% of the subtotal
    And the grand total should equal subtotal - discount + shipping

  Scenario: Currency handling
    Given all prices are in USD
    When I view cart calculations
    Then all amounts should be prefixed with "$"
    And all calculations should use USD formatting conventions
