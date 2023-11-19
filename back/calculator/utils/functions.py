import math
def calculate_average_price(prices):
        if prices:
            total_price = sum(price for price in prices)
            average_price = total_price / len(prices)
            return average_price
        else:
            return 0
def count_of_pages(count_of_cars):
    if count_of_cars:
        count_of_cars_int = int(''.join(filter(str.isdigit, count_of_cars.text)))
        count_of_pages = math.ceil(count_of_cars_int/20)
        return count_of_pages
    else:
        return 0