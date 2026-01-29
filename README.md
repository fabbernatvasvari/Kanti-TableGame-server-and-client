# Kanti-TableGame-server

## 3. feladat
> Hozz létre egy szervert, mely számnégyeseket fog tárolni.  
> Mindegyik számnégyes csak egyszer szerepelhet az adatbázisban.  
> Mindegyik számnégyesnek legyen indexe, mely alapján le lehessen kérdezni a négy számot.  
> Le lehessen kérdezni az összes számnégyest is.  
>  
> Hibás adat megadása esetén (kevesebb vagy több szám, mint négy)  
> a szerver **"Invalid data"** üzenetet adjon vissza.  
>  
> **Végpontok:**  
> `/fours`  
> `/fours/:id`

Ez egy egyszerű Node.js + Express alapú szerver, amely számnégyeseket tárol

memóriában. A szerver REST végpontokon keresztül érhető el.

