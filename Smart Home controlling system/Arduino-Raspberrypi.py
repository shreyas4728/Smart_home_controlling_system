import RPi.GPIO as GPIO
import time

# Setup GPIO mode
GPIO.setmode(GPIO.BCM)

# Pins for devices (for example: Pin 17 for light, Pin 27 for fan)
light_pin = 17
fan_pin = 27

# Setup pins
GPIO.setup(light_pin, GPIO.OUT)
GPIO.setup(fan_pin, GPIO.OUT)

# Function to control device
def control_device(device, action):
    if device == "light":
        if action == "on":
            GPIO.output(light_pin, GPIO.HIGH)
        elif action == "off":
            GPIO.output(light_pin, GPIO.LOW)
    elif device == "fan":
        if action == "on":
            GPIO.output(fan_pin, GPIO.HIGH)
        elif action == "off":
            GPIO.output(fan_pin, GPIO.LOW)

# Example: Turn light on and fan off
control_device("light", "on")
control_device("fan", "off")

time.sleep(10)  # Keep devices on for 10 seconds

# Clean up GPIO to release resources
GPIO.cleanup()
