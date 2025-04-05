import tkinter as tk
import requests

# Function to fetch weather data from the API based on latitude and longitude
def get_weather_by_coordinates(lat, lon, api_key):
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric"
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
        return "Error: Unable to fetch data. Please check the coordinates."

# Function to handle the search button click (latitude and longitude)
def search_weather():
    lat = lat_entry.get()  # Get latitude from entry widget
    lon = lon_entry.get()  # Get longitude from entry widget
    api_key = "your_api_key"  # Replace with your actual API key
    result = get_weather_by_coordinates(lat, lon, api_key)
    result_label.config(text=result)

# Set up the GUI using tkinter
window = tk.Tk()
window.title("Weather App (Lat/Lon)")

# Create and place the widgets for latitude and longitude
lat_label = tk.Label(window, text="Enter Latitude:")
lat_label.pack()

lat_entry = tk.Entry(window, width=30)
lat_entry.pack()

lon_label = tk.Label(window, text="Enter Longitude:")
lon_label.pack()

lon_entry = tk.Entry(window, width=30)
lon_entry.pack()

search_button = tk.Button(window, text="Search Weather", command=search_weather)
search_button.pack()

result_label = tk.Label(window, text="", font=("Arial", 14))
result_label.pack()

# Start the GUI loop
window.mainloop()
