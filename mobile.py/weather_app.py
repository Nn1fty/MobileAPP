import tkinter as tk
import requests

# Function to fetch weather data from the API
def get_weather(city, api_key):
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={weather}"
    response = requests.get(url)
    data = response.json()
    
    if data["cod"] == 200:  # Successful response
        main = data["main"]
        weather = data["weather"][0]
        temp = main["temp"]
        humidity = main["humidity"]
        description = weather["description"]
        
        # Display the weather data
        result = f"Weather: {description.capitalize()}\nTemp: {temp}°C\nHumidity: {humidity}%"
        return result
    else:
        return "City not found! Please check the city name."

# Function to handle the search button click
def search_weather():
    city = city_entry.get()  # Get city name from entry widget
    api_key = "your_api_key"  # Replace with your actual API key
    result = get_weather(city, api_key)
    result_label.config(text=result)

# Set up the GUI using tkinter
window = tk.Tk()
window.title("Weather App")

# Create and place the widgets
city_label = tk.Label(window, text="Enter City Name:")
city_label.pack()

city_entry = tk.Entry(window, width=30)
city_entry.pack()

search_button = tk.Button(window, text="Search Weather", command=search_weather)
search_button.pack()

result_label = tk.Label(window, text="", font=("Arial", 14))
result_label.pack()

# Start the GUI loop
window.mainloop()
