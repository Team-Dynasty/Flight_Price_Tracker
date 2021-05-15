from datetime import datetime, timedelta
import requests


From=input("FROM: ").title()
Destination=input("DESTINATION: ").title()
months=int(input("how many months from now you want to search for: "))
trip=input("ways: ").lower()

TEQUILA_ENDPOINT = "https://tequila-api.kiwi.com"
TEQUILA_API_KEY = "NZ1N-dUb46M2DP0wrST6VQXyOJ6ndMpm"


def get_destination_code(self, city_name):
    location_endpoint = f"{TEQUILA_ENDPOINT}/locations/query"
    headers = {"apikey": TEQUILA_API_KEY}
    query = {"term": city_name, "location_types": "city"}
    response = requests.get(url=location_endpoint, headers=headers, params=query)
    results = response.json()["locations"]
    code = results[0]["code"]
    return code

origin_city_code= get_destination_code(0,From)
destination_city_code= get_destination_code(0,Destination)
print (origin_city_code)
print (destination_city_code)

from_time = datetime.now() + timedelta(days=1)
to_time = datetime.now() + timedelta(days=(months * 30))

headers = {"apikey": TEQUILA_API_KEY}
query = {
"fly_from": "BOM",
"fly_to": "NAG",
"date_from": from_time.strftime("%d/%m/%Y"),
"date_to": to_time.strftime("%d/%m/%Y"),
# "nights_in_dst_from": 7,
# "nights_in_dst_to": 28,
"flight_type": "oneway",
"one_for_city": 1,
"max_stopovers": 0,
"curr": "INR"
}
response = requests.get(
            url=f"{TEQUILA_ENDPOINT}/v2/search",
            headers=headers,
            params=query,
        )
data = response.json()["data"][0]
print(data)
#
price=data["price"]
local_arrival=data["local_arrival"]
out_date=data["route"][0]["local_departure"].split("T")[0],
out_time=data["route"][0]["local_departure"].split("T")[1],

# out_date=data["route"][0]["local_departure"].split("T")[0],
# return_date=data["route"][1]["local_departure"].split("T")[0]
# print(out_date)
# print(return_date)
print(price)

# departure date and time flight
print(out_date)
print(out_time)

# time and date when you reach to the destination
print(local_arrival)



# try:
#     data = response.json()["data"][0]
# except IndexError:
#     print(f"No flights found for {destination_city_code}.")
#     return None
# 
# flight_data = FlightData(
#     price=data["price"],
#     origin_city=data["route"][0]["cityFrom"],
#     origin_airport=data["route"][0]["flyFrom"],
#     destination_city=data["route"][0]["cityTo"],
#     destination_airport=data["route"][0]["flyTo"],
#     out_date=data["route"][0]["local_departure"].split("T")[0],
#     return_date=data["route"][1]["local_departure"].split("T")[0]
# )
# print(f"{flight_data.destination_city}: £{flight_data.price}")
# print(flight_data)
# 
# 
# # class FlightSearch:
# # 
# #     def check_flights(self, origin_city_code, destination_city_code, from_time, to_time):
# #         headers = {"apikey": TEQUILA_API_KEY}
# #         query = {
# #             "fly_from": origin_city_code,
# #             "fly_to": destination_city_code,
# #             "date_from": from_time.strftime("%d/%m/%Y"),
# #             "date_to": to_time.strftime("%d/%m/%Y"),
# #             "nights_in_dst_from": 7,
# #             "nights_in_dst_to": 28,
# #             "flight_type": "round",
# #             "one_for_city": 1,
# #             "max_stopovers": 0,
# #             "curr": "INR"
# #         }
# # 
# #         response = requests.get(
# #             url=f"{TEQUILA_ENDPOINT}/v2/search",
# #             headers=headers,
# #             params=query,
# #         )
# # 
# #         try:
# #             data = response.json()["data"][0]
# #         except IndexError:
# #             print(f"No flights found for {destination_city_code}.")
# #             return None
# # 
# #         flight_data = FlightData(
# #             price=data["price"],
# #             origin_city=data["route"][0]["cityFrom"],
# #             origin_airport=data["route"][0]["flyFrom"],
# #             destination_city=data["route"][0]["cityTo"],
# #             destination_airport=data["route"][0]["flyTo"],
# #             out_date=data["route"][0]["local_departure"].split("T")[0],
# #             return_date=data["route"][1]["local_departure"].split("T")[0]
# #         )
# #         print(f"{flight_data.destination_city}: £{flight_data.price}")
# #         print(flight_data)
# #         return flight_data
# 
# class FlightData:
# 
#     def __init__(self, price, origin_city, origin_airport, destination_city, destination_airport, out_date, return_date):
#         self.price = price
#         self.origin_city = origin_city
#         self.origin_airport = origin_airport
#         self.destination_city = destination_city
#         self.destination_airport = destination_airport
#         self.out_date = out_date
#         self.return_date = return_date
# flightdata=FlightData()
# print(flightdata.price)

#
# data_manager = DataManager()
# sheet_data = data_manager.get_destination_data()
# flight_search = FlightSearch()
#
# From_code=flight_search.get_destination_code(From)
# ORIGIN_CITY_IATA = From_code
#
#
#
# if sheet_data[0]["iataCode"] == "":
#     for row in sheet_data:
#         row["iataCode"] = flight_search.get_destination_code(row["City"])
#     data_manager.destination_data = sheet_data
#     data_manager.update_destination_codes()
#
# tomorrow = datetime.now() + timedelta(days=1)
# six_month_from_today = datetime.now() + timedelta(days=(3 * 30))
#
# for destination in sheet_data:
#     flight = flight_search.check_flights(
#         ORIGIN_CITY_IATA,
#         destination["iataCode"],
#         from_time=tomorrow,
#         to_time=six_month_from_today
#     )
#
#
#
#
#
#
#

#
#
# import requests
# from pprint import pprint
#
# SHEETY_PRICES_ENDPOINT = "https://api.sheety.co/3a3f46db6c1d4f7f306d96cff9b94b5e/flightPriceTracker/prices"
#
#
# class DataManager:
#
#     def __init__(self):
#         self.destination_data = {}
#
#     def get_destination_data(self):
#         response = requests.get(url=SHEETY_PRICES_ENDPOINT)
#         data = response.json()
#         self.destination_data = data["prices"]
#         return self.destination_data
#
#     def update_destination_codes(self):
#         for city in self.destination_data:
#             new_data = {
#                 "price": {
#                     "iataCode": city["iataCode"]
#                 }
#             }
#             response = requests.put(
#                 url=f"{SHEETY_PRICES_ENDPOINT}/{city['id']}",
#                 json=new_data
#             )
#             print(response.text)



















