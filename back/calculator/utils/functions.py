import math

import numpy as np
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
    

def remove_anomalies(arr):
    # Вычисляем межквартильный размах
    q1 = np.percentile(arr, 25)
    q3 = np.percentile(arr, 75)
    iqr = q3 - q1

    # Определяем границы для аномальных значений
    lower_bound = q1 - 1.5 * iqr
    upper_bound = q3 + 1.5 * iqr

    # Убираем аномальные значения из массива
    cleaned_arr = [x for x in arr if lower_bound <= x <= upper_bound]

    return cleaned_arr