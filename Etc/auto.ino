int izqA = 5; 
int izqB = 6; 
int derA = 9; 
int derB = 10; 
int vel = 255;            // Velocidad de los motores (0-255)
int estado = 'g';         // inicia detenido

void setup()  { 
  Serial.begin(9600);    // inicia el puerto serial para comunicacion con el Bluetooth
  pinMode(derA, OUTPUT);
  pinMode(derB, OUTPUT);
  pinMode(izqA, OUTPUT);
  pinMode(izqB, OUTPUT);
 } 
 
void loop()  { 
  
  if(Serial.available()>0){        // lee el bluetooth y almacena en estado
      estado = Serial.read();
  }
  if(estado=='a'){           // Boton desplazar al Frente
      analogWrite(derB, 0);     
      analogWrite(izqB, 0); 
      analogWrite(derA, vel);  
      analogWrite(izqA, vel);       
  }
  if(estado=='b'){          // Boton IZQ 
      analogWrite(derB, 0);     
      analogWrite(izqB, 0); 
      analogWrite(derA, 0);  
      analogWrite(izqA, vel);      
  }
  if(estado=='c'){         // Boton Parar
      analogWrite(derB, 0);     
      analogWrite(izqB, 0); 
      analogWrite(derA, 0);    
      analogWrite(izqA, 0); 
  }
  if(estado=='d'){          // Boton DER
       analogWrite(derB, 0);     
       analogWrite(izqB, 0);
       analogWrite(izqA, 0);
       analogWrite(derA, vel);  
  } 
  
  if(estado=='e'){          // Boton Reversa
       analogWrite(derA, 0);    
       analogWrite(izqA, 0);
       analogWrite(derB, vel);  
       analogWrite(izqB, vel);      
  }
}