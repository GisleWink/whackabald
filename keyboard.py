#program for å bruke knappene som input
import RPi.GPIO as GPIO
import time
from pynput.keyboard import Key, Controller

GPIO.setmode(GPIO.BCM)
keyboard = Controller()

# Assign variable for right and left buttons
buttons = [31,32,33,35,36,37]

#configure the button pins to pull up 
GPIO.setup(left_button, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(right_button, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# define callbacks
def pressed(key):
    print('Right Button Pressed')
    #simulate CTL-TAB
    keyboard.press_and_release(key)


# Assign callback to button press event

# when left button is pressed simulate the windowsKey being pressed
for i in range(len(buttons)):
    GPIO.add_event_detect(buttons[i], GPIO.FALLING, callback=pressed(str(i+1)), bouncetime=300)

# this while loop will make sure the script runs forever
try:
  while True:
      time.sleep(0.2)

except KeyboardInterrupt:
  GPIO.cleanup()       # clean up GPIO on CTRL+C exit

GPIO.cleanup()           # clean up GPIO on normal exit
