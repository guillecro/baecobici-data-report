
![Header](/images/header.png)


# Exploración y curaduría del dataset de Bicicletas Públicas de la Ciudad de Buenos Aires (2010-2024)

> [!NOTE]
> Última actualización: 30/06/2024

> [!IMPORTANT]
> Para visitar el Reporte hecho en Looker Studio, ingrese al siguiente link: [Link al reporte](https://lookerstudio.google.com/reporting/d4a454c5-413d-457c-8925-1742b95d79fe/page/p_5p3f45lmid)

El siguiente repositorio es un trabajo de ETL (Extract, Transform, Load) de los datos de Ecobici de la Ciudad de Buenos Aires, que estan disponibles en el portal de Datos Abiertos de la Ciudad de Buenos Aires (BA Data). El trabajo consiste en la extracción de los datos, la transformación de los mismos y la carga en una base de datos MySQL.

> Hecho en Junio 2024 por Guillermo Croppi para el curso de Especializacion Gestión Pública y Datos - Instituto de Formación Pólitica y Gestión Pública CABA

### 🤔 Motivación

En cuanto a los objetivos del trabajo final para la Especialización en Gestión Pública y Datos, encontre motivante trabajar con un dataset con gran cantidad de datos, pero ademas, con poder hacer una completa aplicación de los ciclos de vida de los datos, siendo: 

- **Extracción de los datos:** Descargar los datos de la fuente original.
- **Transformación de los datos:** Limpiar, normalizar y estructurar los datos en un formato que sea util para el analisis.
- **Carga de los datos:** Cargar los datos en una base de datos para poder realizar consultas y analisis.
- **Análisis de los datos:** Realizar un analisis exploratorio de los datos para encontrar patrones, tendencias y relaciones entre los datos, utilizando Looker Studio para la visualización de los datos.

El siguiente anexo a mi trabajo final de la Especialización en Gestión Pública y Datos se presenta estructurado de forma de recorrer estos pasos de un ciclo de vida de los datos, con el objetivo de poder presentar un trabajo completo y que pueda ser utilizado como referencia para futuros trabajos.

Como motivación adicional, el dataset de BA Ecobici es un dataset interesante de analizar por las distintas complejidades que se encontraron en los distintos recursos y herramientas, como ser:

- Diferencias en la estructura de los datos entre los años.
- Diferencias en los valores de los datos entre los años.
- El tamaño de los datos, que requiere de un procesamiento eficiente.


### ✋ Limitaciones encontradas

En el transcurso de la realización del trabajo, se encontraron limitaciones a la hora de trabajar con CSV en Looker Studio:

- Se permite almacenamiento de hasta 2GB de almacenamientos por usuario.
- Cada dataset no puede superar los 100MB.

Estas dos complicaciones son un desafio a la hora de trabajar con un dataset de 7.2GB, por lo que, para poder trabajar con Looker Studio, se preparo una base de datos MySQL hosteada en Digital Ocean para poder usar el driver de MySQL en Looker Studio y superar estas limitaciones.

> Nota, la misma estará disponible hasta finales de Julio 2024.

## ⛏️ Extracción de los datos

El dataset de [Bicicletas Públicas](https://data.buenosaires.gob.ar/dataset/bicicletas-publicas) del programa BA Ecobici es un dataset con datos desde 2010 hasta 2024.

Se encuentran disponibles dos grandes grupos de recursos

- Los recorridos realizados entre los años 2010 y 2024.
- La alta de usuarios registrados en el sistema entre los años 2015 y 2024.

> Nota: Cabe destacar que el año 2024 sigue en curso, por lo que los datos de este año son parciales.

A la hora de descargar los archivos uno por uno, nos encontramos con que los archivos de los recorridos realizados son de un tamaño considerable en comparativa con los de los usuarios. Haciendo una investigación mas extensa de los archivos, se decidió realizar scripts hechos en Javascript para contar la cantidad de registros por archivo y el tamaño de los mismos.

En primer lugar realizamos el conteo de los registros por archivo de los usuarios registrados en el sistema entre los años 2015 y 2024.

```bash
zaqueo@mapache:~/dev/baecobici-data-report$ node usuarios-get-count-rows-per-year.js
Processing data/original/usuarios_ecobici_2015.csv
-- Completed data/original/usuarios_ecobici_2015.csv (took 0s)
Processing data/original/usuarios_ecobici_2016.csv
-- Completed data/original/usuarios_ecobici_2016.csv (took 0s)
Processing data/original/usuarios_ecobici_2017.csv
-- Completed data/original/usuarios_ecobici_2017.csv (took 0s)
Processing data/original/usuarios_ecobici_2018.csv
-- Completed data/original/usuarios_ecobici_2018.csv (took 0s)
Processing data/original/usuarios_ecobici_2019.csv
-- Completed data/original/usuarios_ecobici_2019.csv (took 0s)
Processing data/original/usuarios_ecobici_2020.csv
-- Completed data/original/usuarios_ecobici_2020.csv (took 0s)
Processing data/original/usuarios_ecobici_2021.csv
-- Completed data/original/usuarios_ecobici_2021.csv (took 0s)
Processing data/original/usuarios_ecobici_2022.csv
-- Completed data/original/usuarios_ecobici_2022.csv (took 0s)
Processing data/original/usuarios_ecobici_2023.csv
-- Completed data/original/usuarios_ecobici_2023.csv (took 0s)
Processing data/original/usuarios_ecobici_2024.csv
-- Completed data/original/usuarios_ecobici_2024.csv (took 0s)
Done! Saving file...
┌─────────┬────────┬───────────┐
│ (index) │  year  │ row_count │
├─────────┼────────┼───────────┤
│    0    │ '2015' │   40397   │
│    1    │ '2016' │   39481   │
│    2    │ '2017' │   58222   │
│    3    │ '2018' │   56182   │
│    4    │ '2019' │   83600   │
│    5    │ '2020' │  107166   │
│    6    │ '2021' │   81577   │
│    7    │ '2022' │  105997   │
│    8    │ '2023' │  136066   │
│    9    │ '2024' │   67615   │
└─────────┴────────┴───────────┘
```

En segundo lugar realizamos el conteo de los registros por archivo de los recorridos realizados entre los años 2010 y 2024.

```bash
zaqueo@mapache:~/dev/baecobici-data-report$ node recorridos-get-count-rows-per-year.js
Processing data/original/recorridos_realizados_2010.csv
-- Completed data/original/usuarios_ecobici_2010.csv (took 0s)
Processing data/original/recorridos_realizados_2011.csv
-- Completed data/original/usuarios_ecobici_2011.csv (took 0s)
Processing data/original/recorridos_realizados_2012.csv
-- Completed data/original/usuarios_ecobici_2012.csv (took 0s)
Processing data/original/recorridos_realizados_2013.csv
-- Completed data/original/usuarios_ecobici_2013.csv (took 0s)
Processing data/original/recorridos_realizados_2014.csv
-- Completed data/original/usuarios_ecobici_2014.csv (took 0s)
Processing data/original/recorridos_realizados_2015.csv
-- Completed data/original/usuarios_ecobici_2015.csv (took 0s)
Processing data/original/recorridos_realizados_2016.csv
-- Completed data/original/usuarios_ecobici_2016.csv (took 0s)
Processing data/original/recorridos_realizados_2017.csv
-- Completed data/original/usuarios_ecobici_2017.csv (took 0s)
Processing data/original/recorridos_realizados_2018.csv
-- Completed data/original/usuarios_ecobici_2018.csv (took 2s)
Processing data/original/recorridos_realizados_2019.csv
-- Completed data/original/usuarios_ecobici_2019.csv (took 6s)
Processing data/original/recorridos_realizados_2020.csv
-- Completed data/original/usuarios_ecobici_2020.csv (took 2s)
Processing data/original/recorridos_realizados_2021.csv
-- Completed data/original/usuarios_ecobici_2021.csv (took 3s)
Processing data/original/recorridos_realizados_2022.csv
-- Completed data/original/usuarios_ecobici_2022.csv (took 3s)
Processing data/original/recorridos_realizados_2023.csv
-- Completed data/original/usuarios_ecobici_2023.csv (took 2s)
Processing data/original/recorridos_realizados_2024.csv
-- Completed data/original/usuarios_ecobici_2024.csv (took 1s)
Done! Saving file...
┌─────────┬────────┬───────────┐
│ (index) │  year  │ row_count │
├─────────┼────────┼───────────┤
│    0    │ '2010' │   3158    │
│    1    │ '2011' │  407956   │
│    2    │ '2012' │  663406   │
│    3    │ '2013' │  1067633  │
│    4    │ '2014' │  1069606  │
│    5    │ '2015' │  503252   │
│    6    │ '2016' │  596807   │
│    7    │ '2017' │  1048158  │
│    8    │ '2018' │  2619968  │
│    9    │ '2019' │  6217004  │
│   10    │ '2020' │  2415597  │
│   11    │ '2021' │  2860091  │
│   12    │ '2022' │  2922805  │
│   13    │ '2023' │  2622331  │
│   14    │ '2024' │  1067623  │
└─────────┴────────┴───────────┘
```

A continuacion se presenta una tabla con los datos de los archivos de recorridos realizados y de los usuarios.


| File Name                      | File Size | Row Count |
|--------------------------------|:---------:|:---------:|
| recorridos_realizados_2010.csv | 665K      | 3158      |
| recorridos_realizados_2011.csv | 83M       | 407956    |
| recorridos_realizados_2012.csv | 139M      | 663406    | 
| recorridos_realizados_2013.csv | 247M      | 1067633   |
| recorridos_realizados_2014.csv | 81M       | 1069606   |
| recorridos_realizados_2015.csv | 112M      | 503252    |
| recorridos_realizados_2016.csv | 133M      | 596807    |
| recorridos_realizados_2017.csv | 238M      | 1048158   |
| recorridos_realizados_2018.csv | 657M      | 2619968   |
| recorridos_realizados_2019.csv | 1.8G      | 6217004   |
| recorridos_realizados_2020.csv | 702M      | 2415597   |
| recorridos_realizados_2021.csv | 840M      | 2860091   |
| recorridos_realizados_2022.csv | 827M      | 2922805   |
| recorridos_realizados_2023.csv | 725M      | 2622331   |
| recorridos_realizados_2024.csv | 262M      | 1067623   |
| **Total in size:**                     | **7,2 GB**| **26085395** |

> Cantida de registros Vs. Tamaño de los archivos en los recursos de recorridos realizados.

| File Name                     | File Size | Row Count |
|-------------------------------|:---------:|:---------:|
| usuarios_ecobici_2015.csv     | 1.3M      | 40397     |
| usuarios_ecobici_2016.csv     | 1.3M      | 39481     |
| usuarios_ecobici_2017.csv     | 1.9M      | 58222     |
| usuarios_ecobici_2018.csv     | 1.8M      | 56182     |
| usuarios_ecobici_2019.csv     | 3.4M      | 83600     |
| usuarios_ecobici_2020.csv     | 5.1M      | 107166    |
| usuarios_ecobici_2021.csv     | 3.9M      | 81577     |
| usuarios_ecobici_2022.csv     | 5.1M      | 105997    |
| usuarios_ecobici_2023.csv     | 6.7M      | 136066    |
| usuarios_ecobici_2024.csv     | 3.4M      | 67615     |
| **Total in size:**                    | **35.2M** | **776303**    |

> Cantida de registros Vs. Tamaño de los archivos en los recursos de usuarios.

Una primera observación que se puede hacer es que los archivos de recorridos realizados son mucho mas grandes que los archivos de usuarios, lo cual es esperable ya que los recorridos realizados son eventos que se generan cada vez que un usuario realiza un recorrido, mientras que los usuarios son datos estáticos que se generan una vez que el usuario se registra en el sistema.

Tambien notamos a primera vista:

* Los recorridos de 2010 son considerablemente mas chicos que los demas años.
* Notamos un pico de recorridos en 2019, casi mas del doble el periodo anterior (2018), lo cual es interesante ver que luego en 2020, año de la pandemia, vuelve a bajar a niveles de 2018 y se mantiene casi constante en 2021 a 2023. Tambien se puede considerar que en ese mismo año, BAEcobici dejó de ser completamente gratuito luego de la aprobación por ley del programa “Buenos Aires, Ciudad Bici” ([Clarin, 19/11/2020](https://www.clarin.com/ciudades/ecobici-deja-totalmente-gratuito-aprueban-ley-cobrarles-turistas-vecinos-fines-semana_0_GCPY_irgK.html))

Luego se procedió a hacer un analisis de los valores de los datos, para poder estudiar de mejor forma la estructura de los datos para posteriormente hacer cualquier transformación necesaria para su sanitizacion y posterior carga en la base de datos.

### 👥 Dataset de usuarios

El dataset de usuarios registrados es el conjunto de datos mas accesible para trabajar con herramientas clasicas como Google Sheets, Excel, Open Office, etc.

Sin embargo, al explorar los archivos csv, notamos que la estructura de los datos es distinta entre los años, lo cual nos lleva a tener que hacer un analisis más profundo.

Vamos a analizar 2 cosas:
- Las estructuras de los datos, o sea, sus columnas, para evaluar si hay diferencias entre los años.
- Los valores de los datos, bajo la sospecha que, de haber diferencias encontradas en su estructura, tambien habrá diferencias en los valores de los datos.

Mediante el siguiente script, se obtiene la estructura de los datos de los usuarios registrados en el sistema entre los años 2015 y 2024.


```bash
zaqueo@mapache:~/dev/baecobici-data-report$ node usuarios-get-column-names-per-year.js
Processing data/original/usuarios_ecobici_2015.csv
-- Completed data/original/usuarios_ecobici_2015.csv (took 0s)
Processing data/original/usuarios_ecobici_2016.csv
-- Completed data/original/usuarios_ecobici_2016.csv (took 0s)
Processing data/original/usuarios_ecobici_2017.csv
-- Completed data/original/usuarios_ecobici_2017.csv (took 0s)
Processing data/original/usuarios_ecobici_2018.csv
-- Completed data/original/usuarios_ecobici_2018.csv (took 0s)
Processing data/original/usuarios_ecobici_2019.csv
-- Completed data/original/usuarios_ecobici_2019.csv (took 0s)
Processing data/original/usuarios_ecobici_2020.csv
-- Completed data/original/usuarios_ecobici_2020.csv (took 0s)
Processing data/original/usuarios_ecobici_2021.csv
-- Completed data/original/usuarios_ecobici_2021.csv (took 0s)
Processing data/original/usuarios_ecobici_2022.csv
-- Completed data/original/usuarios_ecobici_2022.csv (took 0s)
Processing data/original/usuarios_ecobici_2023.csv
-- Completed data/original/usuarios_ecobici_2023.csv (took 0s)
Processing data/original/usuarios_ecobici_2024.csv
-- Completed data/original/usuarios_ecobici_2024.csv (took 0s)
Done. Saving file...
┌─────────┬──────────────┬──────────────────┬────────────────┬──────────────┬─────────────┬───────────────────────────────┐
│ (index) │      0       │        1         │       2        │      3       │      4      │               5               │
├─────────┼──────────────┼──────────────────┼────────────────┼──────────────┼─────────────┼───────────────────────────────┤
│  2015   │ 'id_usuario' │ 'genero_usuario' │ 'edad_usuario' │ 'fecha_alta' │ 'hora_alta' │                               │
│  2016   │ 'id_usuario' │ 'genero_usuario' │ 'edad_usuario' │ 'fecha_alta' │ 'hora_alta' │                               │
│  2017   │ 'id_usuario' │ 'genero_usuario' │ 'edad_usuario' │ 'fecha_alta' │ 'hora_alta' │                               │
│  2018   │ 'id_usuario' │ 'genero_usuario' │ 'edad_usuario' │ 'fecha_alta' │ 'hora_alta' │                               │
│  2019   │ 'ID_usuario' │ 'genero_usuario' │ 'edad_usuario' │ 'fecha_alta' │ 'hora_alta' │                               │
│  2020   │ 'ID_usuario' │ 'genero_usuario' │ 'edad_usuario' │ 'fecha_alta' │ 'hora_alta' │ 'Customer.Has.Dni..Yes...No.' │
│  2021   │ 'ID_usuario' │ 'genero_usuario' │ 'edad_usuario' │ 'fecha_alta' │ 'hora_alta' │ 'Customer.Has.Dni..Yes...No.' │
│  2022   │ 'ID_usuario' │ 'genero_usuario' │ 'edad_usuario' │ 'fecha_alta' │ 'hora_alta' │ 'Customer.Has.Dni..Yes...No.' │
│  2023   │ 'ID_usuario' │ 'genero_usuario' │ 'edad_usuario' │ 'fecha_alta' │ 'hora_alta' │ 'Customer.Has.Dni..Yes...No.' │
│  2024   │ 'ID_usuario' │ 'genero_usuario' │ 'edad_usuario' │ 'fecha_alta' │ 'hora_alta' │ 'Customer.Has.Dni..Yes...No.' │
└─────────┴──────────────┴──────────────────┴────────────────┴──────────────┴─────────────┴───────────────────────────────┘
```

Mediante el siguiente script, se obtienen algunos valores elegidos al azar de cada una de las columnas de los usuarios registrados en el sistema entre los años 2015 y 2024.

```bash
zaqueo@mapache:~/dev/baecobici-data-report$ node usuarios-get-example-values.js
Processing data/original/usuarios_ecobici_2015.csv
-- Completed data/original/usuarios_ecobici_2015.csv (took 0s)
Processing data/original/usuarios_ecobici_2016.csv
-- Completed data/original/usuarios_ecobici_2016.csv (took 0s)
Processing data/original/usuarios_ecobici_2017.csv
-- Completed data/original/usuarios_ecobici_2017.csv (took 0s)
Processing data/original/usuarios_ecobici_2018.csv
-- Completed data/original/usuarios_ecobici_2018.csv (took 0s)
Processing data/original/usuarios_ecobici_2019.csv
-- Completed data/original/usuarios_ecobici_2019.csv (took 0s)
Processing data/original/usuarios_ecobici_2020.csv
-- Completed data/original/usuarios_ecobici_2020.csv (took 0s)
Processing data/original/usuarios_ecobici_2021.csv
-- Completed data/original/usuarios_ecobici_2021.csv (took 0s)
Processing data/original/usuarios_ecobici_2022.csv
-- Completed data/original/usuarios_ecobici_2022.csv (took 0s)
Processing data/original/usuarios_ecobici_2023.csv
-- Completed data/original/usuarios_ecobici_2023.csv (took 0s)
Processing data/original/usuarios_ecobici_2024.csv
-- Completed data/original/usuarios_ecobici_2024.csv (took 0s)
done
┌─────────┬──────────────────────┬──────────────────────────────────┬────────────────────────────────┬──────────────────────┬──────────────────────────────────────────────┬────────────────────────────────────────────────┬─────────────────────────────────────┬─────────────────────────────┐
│ (index) │         year         │            id_usuario            │         genero_usuario         │     edad_usuario     │                  fecha_alta                  │                   hora_alta                    │             ID_usuario              │ Customer.Has.Dni..Yes...No. │
├─────────┼──────────────────────┼──────────────────────────────────┼────────────────────────────────┼──────────────────────┼──────────────────────────────────────────────┼────────────────────────────────────────────────┼─────────────────────────────────────┼─────────────────────────────┤
│  2015   │ [ 2015, 2015, 2015 ] │ [ '137272', '158456', '213389' ] │       [ 'F', 'F', 'F' ]        │ [ '32', '33', '42' ] │    [ '07-04-15', '22-06-15', '10-11-15' ]    │ [ '5:15:09 AM', '3:29:35 PM', '10:11:34 AM' ]  │                                     │                             │
│  2016   │ [ 2016, 2016, 2016 ] │ [ '236773', '322058', '322836' ] │       [ 'F', 'M', 'M' ]        │ [ '40', '23', '49' ] │    [ '05-03-16', '20-11-16', '22-11-16' ]    │ [ '7:59:51 PM', '11:37:41 PM', '3:21:20 PM' ]  │                                     │                             │
│  2017   │ [ 2017, 2017, 2017 ] │ [ '353514', '387437', '387501' ] │       [ 'M', 'F', 'F' ]        │ [ '48', '24', '38' ] │    [ '11-02-17', '24-04-17', '24-04-17' ]    │ [ '11:12:50 AM', '12:45:54 PM', '2:12:41 PM' ] │                                     │                             │
│  2018   │ [ 2018, 2018, 2018 ] │ [ '469094', '572672', '518162' ] │       [ 'M', 'F', 'F' ]        │ [ '33', '30', '27' ] │    [ '09-02-18', '04-07-18', '26-02-18' ]    │  [ '5:53:44 AM', '5:56:09 AM', '5:54:01 AM' ]  │                                     │                             │
│  2019   │ [ 2019, 2019, 2019 ] │                                  │ [ 'OTHER', 'FEMALE', 'MALE' ]  │ [ '44', '31', '41' ] │ [ '2019-11-15', '2019-07-19', '2019-05-23' ] │     [ '09:43:21', '11:37:59', '14:50:03' ]     │  [ '586902', '410973', '200341' ]   │                             │
│  2020   │ [ 2020, 2020, 2020 ] │                                  │ [ 'MALE', 'FEMALE', 'FEMALE' ] │ [ '55', '63', '35' ] │ [ '2020-10-10', '2020-08-30', '2020-02-29' ] │     [ '19:57:24', '13:58:47', '09:10:06' ]     │  [ '707017', '688240', '659930' ]   │   [ 'Yes', 'Yes', 'Yes' ]   │
│  2021   │ [ 2021, 2021, 2021 ] │                                  │  [ 'MALE', 'FEMALE', 'MALE' ]  │ [ '34', '19', '25' ] │ [ '2021-11-16', '2021-09-03', '2021-07-02' ] │     [ '23:35:33', '23:30:15', '13:02:19' ]     │  [ '811011', '789284', '774903' ]   │   [ 'Yes', 'Yes', 'Yes' ]   │
│  2022   │ [ 2022, 2022, 2022 ] │                                  │ [ 'MALE', 'FEMALE', 'OTHER' ]  │ [ '38', '36', '47' ] │ [ '2022-09-26', '2022-09-17', '2022-01-08' ] │     [ '09:40:29', '12:34:55', '13:17:26' ]     │  [ '898491', '894620', '824859' ]   │   [ 'Yes', 'Yes', 'Yes' ]   │
│  2023   │ [ 2023, 2023, 2023 ] │                                  │ [ 'FEMALE', 'MALE', 'OTHER' ]  │ [ '19', '30', '38' ] │ [ '2023-11-13', '2023-09-16', '2023-01-08' ] │     [ '12:16:38', '12:21:15', '18:13:40' ]     │ [ '1058269', '1026902', '943083' ]  │   [ 'Yes', 'Yes', 'No' ]    │
│  2024   │ [ 2024, 2024, 2024 ] │                                  │ [ 'FEMALE', 'FEMALE', 'MALE' ] │ [ '47', '19', '26' ] │ [ '2024-04-01', '2024-03-10', '2024-02-03' ] │     [ '16:48:01', '20:03:40', '02:07:09' ]     │ [ '1138406', '1126531', '1104730' ] │   [ 'Yes', 'Yes', 'Yes' ]   │
└─────────┴──────────────────────┴──────────────────────────────────┴────────────────────────────────┴──────────────────────┴──────────────────────────────────────────────┴────────────────────────────────────────────────┴─────────────────────────────────────┴─────────────────────────────┘
```

En base a los datos obtenidos, se pueden hacer las siguientes observaciones:

**Observaciones Basadas en los Datos Obtenidos:**

* **Cambio de Nombres de Columnas:**
   - Entre 2015 y 2018, se utilizaba la columna `id_usuario`, pero a partir de 2019 se cambió el nombre a `ID_usuario`.

* **Formato de Género del Usuario:**
   - Entre 2015 y 2018, la columna `genero_usuario` tenía los valores `M` y `F`. Desde 2019 en adelante, se usaron los valores `MALE`, `FEMALE` y otros.

* **Formato de Fecha de Alta:**
   - Desde 2015 hasta 2018, la columna `fecha_alta` estaba en formato `DD-MM-YY`. De 2019 a 2024, el formato cambió a `YYYY-MM-DD`.

* **Formato de Hora de Alta:**
   - Entre 2015 y 2018, la columna `hora_alta` estaba en formato `H:MM:SS AM/PM`. De 2019 a 2024, se utilizó el formato de 24 horas `HH:MM:SS`.

* **Formato de Género del Usuario (Repetición Eliminada):**
   - Desde 2019 a 2024, además de los valores `MALE` y `FEMALE`, se introdujo el valor `OTHER` para la columna `genero_usuario`.

* **Cálculo de la Edad del Usuario:**
   - La columna `edad_usuario` parece derivar de la fecha de nacimiento del usuario. No se puede determinar con certeza cuándo o cómo se calculó este dato. Puede haberse calculado en el momento de la extracción de datos usando una función como `now()`, o al momento de crear el usuario, o incluso pudo haber sido un campo numérico ingresado por el usuario. Por lo tanto, se asume que el dato es correcto y se mantiene en la tabla maestra.

* **Delimitadores de Strings:**
   - En los datasets de 2015 a 2018, los strings no estaban delimitados por comillas, mientras que de 2019 a 2024 sí lo estaban.

* **Nueva Columna Introducida en 2020:**
   - A partir de 2020, se introdujo una nueva columna `Customer.Has.Dni..Yes...No.` que no estaba presente en los datasets de 2015 a 2019. Esta columna se renombrará a `has_dni` en la tabla maestra.

Sin embargo, esto es una primera observación que se puede hacer sobre los datos. Aun no tenemos una clara idea de la robustez de los datos, por ejemplo, si hay valores nulos, si hay valores repetidos, si hay valores que no corresponden a los tipos de datos esperados, etc.

Para eso se utilizo OpenRefine para hacer un analisis mas profundo de los datos. OpenRefine es una herramienta de código abierto que permite limpiar y transformar datos de forma masiva. 

![OpenRefine upload](/images/openrefine-upload.png)

> Nota: OpenRefine es una herramienta de código abierto que se puede descargar desde [su sitio web oficial](https://openrefine.org/download.html). Sin embargo, es posible que sea necesario aumentar el límite de memoria de Java para manejar conjuntos de datos más grandes. Para hacer esto, se puede ejecutar OpenRefine con la flag `-m` seguida de la cantidad de memoria en megabytes. Por ejemplo, para aumentar el límite de memoria a 6144 MB, se puede ejecutar el siguiente comando en la terminal `zaqueo@mapache:~/Documents/openrefine-3.8.1$ ./refine -m 6144M`

![User database with OpenRefine](/images/openrefine-usuarios.png)

Con OpenRefine podemos hacer una exploración de las columnas, por ejemplo, analizar los valores unicos, o para los valores numericos, como la edad, la expansión de los valores para ver si hay valores nulos, o valores que no corresponden a los tipos de datos esperados.

Nos interesa especificamente los valores unicos de las columnas `genero_usuario`, `edad_usuario` y `Customer.Has.Dni..Yes...No.`.

Para la columna `genero_usuario` se obtuvieron los siguientes valores unicos:

![Genre Facet](/images/usuarios-genero-facet.png)

Como suponiamos, los valores que se encuentran entre 2015 y 2018 son `M` y `F`, mientras que a partir de 2019 se introducen los valores `MALE`, `FEMALE` y `OTHER`. Tambien se detectan valores nulos.

Con respecto a la columna `edad_usuario`, OpenRefine no sabe automaticamente que es un campo numerico, por lo que se debe hacer una conversion de los valores a numericos para poder hacer un analisis de los valores unicos.

![Age Transform](/images/usuarios-age-transform.png)

Luego de la conversion, se obtuvo el siguiente grafico:

![Age Facet](/images/usuarios-age-facet.png)

Aqui podemos notar que en el campo de `edad_usuario` contamos con que:

* Hay valores númericos que se se encuentran fuera de un rango logico (valores por debajo de 0 años, valores por encima de 100, etc), entre algunos valores nulos o no numericos.

Por ultimo, para la columna `Customer.Has.Dni..Yes...No.`, se obtuvieron los siguientes valores unicos:

![Age Facet](/images/usuarios-dni-facet.png)

En este caso, se observa que los valores son `Yes` y `No`, lo cual es un campo de texto que se puede convertir a un campo booleano para nuestra base maestra. Es probable que se pueda haber algun dato nulo, pero es salvable.

#### Conclusiones

Todos estos datos serán de gran utilidad para la creación de la tabla maestra, ya que nos permiten tener una idea más clara de la estructura de los datos y de los valores que contienen. A partir de aquí, podemos comenzar a pensar en cómo limpiar y transformar los datos para que se ajusten a la estructura de la tabla maestra.

### 🚲 Dataset de recorridos

El dataset de recorridos realizados es el conjunto de datos más grande y complejo de trabajar, ya que las herramientas clasicas para abrir CSVs no son suficientes para manejar la cantidad de datos que se tienen. En muchos casos, se necesita de herramientas más especializadas para poder trabajar con estos datos.

En este caso, similar a los usuarios, al explorar los archivos csv, tambien se detectó que la estructura de los datos es distinta entre los años, por lo que se procedió a hacer un analisis más profundo similar a lo que hicimos con los usuarios, donde analizamos:

- Las estructuras de los datos, o sea, sus columnas, para evaluar si hay diferencias entre los años.
- Los valores de los datos, bajo la sospecha que, de haber diferencias encontradas en su estructura, tambien habrá diferencias en los valores de los datos.

Mediante el siguiente script, se obtiene la estructura de los datos de los recorridos realizados en el sistema entre los años 2010 y 2024.

```bash
zaqueo@mapache:~/dev/baecobici-data-report$ node recorridos-get-column-names-per-year.js
Processing data/original/recorridos_realizados_2010.csv
-- Completed data/original/ecorridos_realizados_2010.csv (took 0s)
Processing data/original/recorridos_realizados_2011.csv
-- Completed data/original/ecorridos_realizados_2011.csv (took 0s)
Processing data/original/recorridos_realizados_2012.csv
-- Completed data/original/ecorridos_realizados_2012.csv (took 0s)
Processing data/original/recorridos_realizados_2013.csv
-- Completed data/original/ecorridos_realizados_2013.csv (took 0s)
Processing data/original/recorridos_realizados_2014.csv
-- Completed data/original/ecorridos_realizados_2014.csv (took 0s)
Processing data/original/recorridos_realizados_2015.csv
-- Completed data/original/ecorridos_realizados_2015.csv (took 0s)
Processing data/original/recorridos_realizados_2016.csv
-- Completed data/original/ecorridos_realizados_2016.csv (took 0s)
Processing data/original/recorridos_realizados_2017.csv
-- Completed data/original/ecorridos_realizados_2017.csv (took 0s)
Processing data/original/recorridos_realizados_2018.csv
-- Completed data/original/ecorridos_realizados_2018.csv (took 0s)
Processing data/original/recorridos_realizados_2019.csv
-- Completed data/original/ecorridos_realizados_2019.csv (took 0s)
Processing data/original/recorridos_realizados_2020.csv
-- Completed data/original/ecorridos_realizados_2020.csv (took 0s)
Processing data/original/recorridos_realizados_2021.csv
-- Completed data/original/ecorridos_realizados_2021.csv (took 0s)
Processing data/original/recorridos_realizados_2022.csv
-- Completed data/original/ecorridos_realizados_2022.csv (took 0s)
Processing data/original/recorridos_realizados_2023.csv
-- Completed data/original/ecorridos_realizados_2023.csv (took 0s)
Processing data/original/recorridos_realizados_2024.csv
-- Completed data/original/ecorridos_realizados_2024.csv (took 0s)
Done! Saving file...
```

En este caso, se hizo una exploración manual de las columnas y se encontró efectivamente diferencias en las estructuras de las tablas en cada año.

|Key Column|Descripcion del campo|2010|2011|2012|2013|2014|2015|2016|2017|2018|2019|2020|2021|2022|2023|2024|
|:----|:----|:----|:----|:----|:----|:----|:----|:----|:----|:----|:----|:----|:----|:----|:----|:----|
|id|El id del viaje|*N/A*|*N/A*|*N/A*|*N/A*|ID|*N/A*|*N/A*|*N/A*|*N/A*|Id_recorrido|Id_recorrido|Id_recorrido|Id_recorrido|Id_recorrido|Id_recorrido|
|periodo|El año en quese realizo el viaje|periodo|periodo|periodo|periodo|-|periodo|periodo|periodo|periodo|*N/A*|*N/A*|*N/A*|*N/A*|*N/A*|*N/A*|
|id_usuario|El ID del usuario|*N/A*|*N/A*|*N/A*|id_usuario|*N/A*|*N/A*|*N/A*|*N/A*|id_usuario|id_usuario|id_usuario|id_usuario|id_usuario|id_usuario|id_usuario|
|genero|El genero del usuario|*N/A*|*N/A*|*N/A*|*N/A*|*N/A*|genero_usuario|genero_usuario|genero_usuario|genero_usuario|género|género|género|Género|género|género|
|origen_fecha|Fecha en estación de origen del recorrido|fecha_origen_recorrido|fecha_origen_recorrido|fecha_origen_recorrido|fecha_origen_recorrido|ORIGEN_FECHA|fecha_origen_recorrido|fecha_origen_recorrido|fecha_origen_recorrido|fecha_origen_recorrido|fecha_origen_recorrido|fecha_origen_recorrido|fecha_origen_recorrido|fecha_origen_recorrido|fecha_origen_recorrido|fecha_origen_recorrido|
|origen_id|Id estación (origen)|id_estacion_origen|id_estacion_origen|id_estacion_origen|id_estacion_origen|-|id_estacion_origen|id_estacion_origen|id_estacion_origen|id_estacion_origen|id_estacion_origen|id_estacion_origen|id_estacion_origen|id_estacion_origen|id_estacion_origen|id_estacion_origen|
|origen_nombre|Nombre estación (origen)|nombre_estacion_origen|nombre_estacion_origen|nombre_estacion_origen|nombre_estacion_origen|NOMBRE_ORIGEN|nombre_estacion_origen|nombre_estacion_origen|nombre_estacion_origen|nombre_estacion_origen|nombre_estacion_origen|nombre_estacion_origen|nombre_estacion_origen|nombre_estacion_origen|nombre_estacion_origen|nombre_estacion_origen|
|origen_long|Posicion geografica de la estación de origen - longitud|long_estacion_origen|long_estacion_origen|lat_estacion_origen|long_estacion_origen|-|long_estacion_origen|long_estacion_origen|long_estacion_origen|long_estacion_origen|long_estacion_origen|long_estacion_origen|long_estacion_origen|long_estacion_origen|long_estacion_origen|long_estacion_origen|
|origen_lat|Posición geografica de la estación de origen - latitud|lat_estacion_origen|lat_estacion_origen|long_estacion_origen|lat_estacion_origen|-|lat_estacion_origen|lat_estacion_origen|lat_estacion_origen|lat_estacion_origen|lat_estacion_origen|lat_estacion_origen|lat_estacion_origen|lat_estacion_origen|lat_estacion_origen|lat_estacion_origen|
|origen_domicilio|Domicilio de la estación de origen|domicilio_estacion_origen|domicilio_estacion_origen|domicilio_estacion_origen|domicilio_estacion_origen|-|domicilio_estacion_origen|domicilio_estacion_origen|domicilio_estacion_origen|domicilio_estacion_origen|direccion_estacion_origen|direccion_estacion_origen|direccion_estacion_origen|direccion_estacion_origen|direccion_estacion_origen|direccion_estacion_origen|
|duracion|Duración del recorrido|duracion_recorrido|duracion_recorrido|duracion_recorrido|duracion_recorrido|-|duracion_recorrido|duracion_recorrido|duracion_recorrido|duracion_recorrido|duracion_recorrido|duracion_recorrido|duracion_recorrido|duracion_recorrido|duracion_recorrido|duracion_recorrido|
|destino_fecha|Fecha en estación de origen del recorrido|fecha_destino_recorrido|fecha_destino_recorrido|fecha_destino_recorrido|fecha_destino_recorrido|DESTINO_FECHA|fecha_destino_recorrido|fecha_destino_recorrido|fecha_destino_recorrido|fecha_destino_recorrido|fecha_destino_recorrido|fecha_destino_recorrido|fecha_destino_recorrido|fecha_destino_recorrido|fecha_destino_recorrido|fecha_destino_recorrido|
|destino_id|Id estación (origen)|id_estacion_destino|id_estacion_destino|id_estacion_destino|id_estacion_destino|-|id_estacion_destino|id_estacion_destino|id_estacion_destino|id_estacion_destino|id_estacion_destino|id_estacion_destino|id_estacion_destino|id_estacion_destino|id_estacion_destino|id_estacion_destino|
|destino_nombre|Nombre estación (origen)|nombre_estacion_destino|nombre_estacion_destino|nombre_estacion_destino|nombre_estacion_destino|DESTINO_ESTACION|nombre_estacion_destino|nombre_estacion_destino|nombre_estacion_destino|nombre_estacion_destino|nombre_estacion_destino|nombre_estacion_destino|nombre_estacion_destino|nombre_estacion_destino|nombre_estacion_destino|nombre_estacion_destino|
|destino_long|Posicion geografica de la estación de origen - longitud|long_estacion_destino|long_estacion_destino|lat_estacion_destino|long_estacion_destino|-|long_estacion_destino|long_estacion_destino|long_estacion_destino|long_estacion_destino|long_estacion_destino|long_estacion_destino|long_estacion_destino|long_estacion_destino|long_estacion_destino|long_estacion_destino|
|destino_lat|Posición geografica de la estación de origen - latitud|lat_estacion_destino|lat_estacion_destino|long_estacion_destino|lat_estacion_destino|-|lat_estacion_destino|lat_estacion_destino|lat_estacion_destino|lat_estacion_destino|lat_estacion_destino|lat_estacion_destino|lat_estacion_destino|lat_estacion_destino|lat_estacion_destino|lat_estacion_destino|
|destino_domicilio|Domicilio de la estación de origen|domicilio_estacion_destino|domicilio_estacion_destino|domicilio_estacion_destino|domicilio_estacion_destino|-|domicilio_estacion_destino|domicilio_estacion_destino|domicilio_estacion_destino|domicilio_estacion_destino|direccion_estacion_destino|direccion_estacion_destino|direccion_estacion_destino|direccion_estacion_destino|direccion_estacion_destino|direccion_estacion_destino|
|modelo_bicicleta|Modelo de la bicicleta|*N/A*|*N/A*|*N/A*|*N/A*|*N/A*|*N/A*|*N/A*|*N/A*|*N/A*|modelo_bicicleta|modelo_bicicleta|modelo_bicicleta|modelo_bicicleta|modelo_bicicleta|modelo_bicicleta|

En base a la estructura de los datos de los archivos csv entre los años 2010 y 2024, se pueden hacer las siguientes observaciones:

- El recurso de 2014 es el mas distinto de todos, ya que solo cuenta con `[ID, ORIGEN_FECHA, NOMBRE_ORIGEN, DESTINO_FECHA, DESTINO_ESTACION]` mientras que los demas datasets cuentan con mayor información del recorrido realizado. Si bien el recurso es valido para poder trabajar, es curioso que no cuente con la misma cantidad de columnas que los demas recursos del dataset de recorridos.
- Los años 2010-2013 y 2015-2018 no cuentan con un campo `id` identificador del viaje. Solamente en 2014 y 2019-2024 se cuenta con este campo.
- Los años 2010-2013 y 2015-2018 anexaban el año del recorrido en un campo llamado `periodo`, mientras que en los años 2014 y 2019-2024 no se encuentra este campo.
- Sobre el campo de `genero`, se comenzó a agregar a partir 2016, mientras que de 2010 a 2014 no se encuentra presente. Sin embargo, a partir de 2019, se cambio de nombre la columna `genero_usuario` a `género`, lo cual lleva un tilde en la "e", poco friendly para el manejo de datos. Ademas, el año 2021 cuenta con 2 columnas similares `género` y `Género`, y en 2022 solamente se tiene `Género` lo cual tiende a generar confusión sobre cual es la columna correcta, ya que cuando se hace un analisis de los valores unicos, se encuentran valores distintos en ambas columnas.
- A partir de 2019, se introduce un nuevo campo `modelo_bicicleta` que no se encuentra presente en los años anteriores.
- De 2010 a 2018 se utilizaba para el domicilio de las estaciones las columnas `domicilio_estacion_origen` y `domicilio_estacion_destino`, mientras que a partir de 2019 se cambió a `direccion_estacion_origen` y `direccion_estacion_destino`.
- Durante 2010 a 2017 (con excepción de 2013), los recorridos no anexaban el dato de `id_usuario`, mientras que a partir de 2018 se comienza a agregar este campo.

Bajo sospecha de que, al haber un cambio en como se estructuran los datos, tambien habrá cambios en los valores de los datos, se procedió a hacer un analisis más profundo de los datos. Por lo tanto, se realizó un script para extraer 3 datos al azar de cada columna de los recorridos realizados en el sistema entre los años 2010 y 2024 para investigar en que formato se presentan los datos y si difieren entre los años.


```bash
| year       | id                                                            | periodo          | id_usuario                                               | genero                     | origen_fecha                                                                    | origen_id                                      | origen_nombre                                                                     | origen_long                                                 | origen_lat                                                | origen_domicilio                                                                                                                          | duracion                                                                              | destino_fecha                                                                   | destino_id                                     | destino_nombre                                                                   | destino_long                                                | destino_lat                                                                                           | destino_domicilio                                                                                                             |
| ---------- | ------------------------------------------------------------- | ---------------- | -------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 2010       | NA                                                            | [2010,2010,2010] | NA                                                       | NA                         | ["22/12/2010 18:28","22/12/2010 9:07","01/12/2010 15:29"]                       | [3,3,2]                                        | ["Aduana","Aduana","Retiro"]                                                      | [-58.368917842554104,-58.368917842554104,-58.3748217877563] | [-34.6112420249771,-34.6112420249771,-34.5925888097729]   | ["Av. Ing.Huergo y Av. Belgrano","Av. Ing.Huergo y Av. Belgrano","Av. Dr.Jose Ramos Mejia y Del Libertador Av"]                           | [51,116,119]                                                                          | ["22/12/2010 19:19","22/12/2010 11:03","01/12/2010 17:29"]                      | [1,3,2]                                        | ["Facultad de Derecho","Aduana","Retiro"]                                        | [-58.392452073017,-58.368917842554104,-58.3748217877563]    | [-34.5831330757635,-34.6112420249771,-34.5925888097729]                                               | ["Av. Pres.Figueroa Alcorta y Juan A.Bibiloni","Av. Ing.Huergo y Av. Belgrano","Av. Dr.Jose Ramos Mejia y Del Libertador Av"] |
| 2011       | NA                                                            | [2011,2011,2011] | NA                                                       | NA                         | ["2011-05-07 08:34:00","2011-01-12 14:42:00","2011-11-15 16:48:00"]             | [183,2,1]                                      | ["Virrey Cevallos","Retiro","Facultad de Derecho"]                                | [-58.389691907404696,-58.3748217877563,-58.392452073017]    | [-34.6156376341942,-34.5925888097729,-34.5831330757635]   | ["México 1652 entre Virrey Cevallos y Solís","Av. Dr.Jose Ramos Mejia y Del Libertador Av","Av. Pres.Figueroa Alcorta y Juan A.Bibiloni"] | [13,26,23]                                                                            | ["05/07/2011 8:47","01/12/2011 15:08","15/11/2011 17:11"]                       | [7,12,14]                                      | ["Obelisco","Plaza Vicente López","Pacífico"]                                    | [-58.3809896041082,-58.388948867519595,-58.4263198647396]   | [-34.6058404963166,-34.5931772798824,-34.5777874974914]                                               | ["Av. 9 de Julio y Tte. Gral Juan Domingo Perón","Plaza Vicente López","Pacífico"]                                            |
| 2012       | NA                                                            | [2012,2012,2012] | NA                                                       | NA                         | ["2012-07-31 18:07:08.543","2012-09-14 09:22:07.247","2012-10-12 09:21:16.153"] | [2,20,2]                                       | ["Retiro","Distrito Audiovisual","Retiro"]                                        | [-34.5925888097729,-34.5800361241865,-34.5925888097729]     | [-58.3748217877563,-58.441788509931705,-58.3748217877563] | ["Av. Dr.Jose Ramos Mejia y Del Libertador Av","Zapiola y Dorrego","Av. Dr.Jose Ramos Mejia y Del Libertador Av"]                         | [19,46,17]                                                                            | ["2012-07-31 18:26:04.967","2012-09-14 10:08:19.937","2012-10-12 09:37:52.233"] | [43,4,10]                                      | ["Plaza Houssay","Plaza Roma","Puerto Madero - UCA"]                             | [-34.599189849214696,-34.6017210875929,-34.615551427997495] | [-58.3985214522976,-58.3689503833679,-58.3657458611297]                                               | ["Plaza Houssay","Lavalle y Bouchard","Moreau de Justo 1500"]                                                                 |
| 2013       | NA                                                            | [2013,2013,2013] | [19013,9522,106487]                                      | NA                         | ["2013-03-26 14:06:18.467","2013-10-10 10:28:03.890","2013-11-30 12:25:06.857"] | [9,16,9]                                       | ["Parque Las Heras","Legislatura","Parque Las Heras"]                             | [-58.4071446712567,-58.374717240582,-58.4071446712567]      | [-34.5839145725724,-34.6099593400598,-34.5839145725724]   | ["Parque Las Heras","Perú y Diagonal Sur","Parque Las Heras"]                                                                             | ["0 days 00:29:38.283000000","0 days 00:45:48.200000000","0 days 00:03:17.563000000"] | ["2013-03-26 14:35:56.750","2013-10-10 11:13:52.090","2013-11-30 12:28:24.420"] | [17,16,9]                                      | ["Plaza Almagro","Legislatura","Parque Las Heras"]                               | [-58.41883221444161,-58.374717240582,-58.4071446712567]     | [-34.606398525093304,-34.6099593400598,-34.5839145725724]                                             | ["Plaza Almagro","Perú y Diagonal Sur","Parque Las Heras"]                                                                    |
| 2014       | [79358,73786,104384]                                          | NA               | NA                                                       | NA                         | ["2014-03-27 15:43:34.910","2014-11-04 08:49:36.350","2014-12-22 09:20:39.573"] | NA                                             | ["PLAZA ITALIA","ARENALES","SUIPACHA"]                                            | NA                                                          | NA                                                        | NA                                                                                                                                        | NA                                                                                    | ["2014-03-27 15:43:34.910","2014-11-04 08:49:36.350","2014-12-22 09:20:39.573"] | NA                                             | ["PLAZA ITALIA","RETIRO","EMMA DE LA BARRA"]                                     | NA                                                          | NA                                                                                                    | NA                                                                                                                            |
| 2015       | NA                                                            | [2015,2015,2015] | NA                                                       | ["F","M","M"]              | ["2015-10-08 17:30:06","2015-04-16 10:26:46","2015-04-24 09:46:54"]             | [12,16,8]                                      | ["Plaza Vicente López","Legislatura","Congreso"]                                  | [-58.388948867519595,-58.374717240582,-58.389253260153296]  | [-34.5931772798824,-34.6099593400598,-34.6099304592001]   | ["Plaza Vicente López","Perú y Diagonal Sur","Av. Hipólito Yrigoyen y Virrey Ceballos"]                                                   | ["0 days 00:20:04.000000000","0 days 01:01:47.000000000","0 days 00:10:51.000000000"] | ["2015-10-08 17:50:10","2015-04-16 11:28:33","2015-04-24 09:57:45"]             | [25,16,11]                                     | ["Plaza Güemes","Legislatura","Tribunales"]                                      | [-58.416065021838506,-58.374717240582,-58.385021610721594]  | [-34.5895207284602,-34.6099593400598,-34.6013128134582]                                               | ["Salguero Jerónimo y Mansilla","Perú y Diagonal Sur","Tribunales"]                                                           |
| 2016       | NA                                                            | [2016,2016,2016] | NA                                                       | ["M","M","M"]              | ["2016-11-15 13:06:28","2016-08-17 17:06:20","2016-10-31 10:33:38"]             | [9,26,7]                                       | ["Parque Las Heras","Juana Manso","Obelisco"]                                     | [-58.4071446712567,-58.3636035935707,-58.3809896041082]     | [-34.5839145725724,-34.6010006869203,-34.6058404963166]   | ["Parque Las Heras","Emma de la Barra y Juana Manso","Av. 9 de Julio y Tte. Gral Juan Domingo Perón"]                                     | ["0 days 00:28:10.000000000","0 days 00:37:26.000000000","0 days 00:42:36.000000000"] | ["2016-11-15 13:44:46","2016-08-17 18:16:01",null]                              | [9,26,11]                                      | ["Parque Las Heras","Juana Manso","Tribunales"]                                  | [-58.4071446712567,-58.3636035935707,-58.385021610721594]   | [-34.5839145725724,-34.6010006869203,-34.6013128134582]                                               | ["Parque Las Heras","Emma de la Barra y Juana Manso","Tribunales"]                                                            |
| 2017       | NA                                                            | [2017,2017,2017] | NA                                                       | ["F","M","M"]              | ["2017-01-10 17:26:47","2017-03-11 15:01:31","2017-08-14 07:14:44"]             | [50,20,147]                                    | ["Hospital Rivadavia","Distrito Audiovisual","Constitución I"]                    | [-58.4011477812048,-58.441788509931705,-58.379104861280204] | [-34.5836773298631,-34.5800361241865,-34.6274554061156]   | ["Lucena Pereyra 2516 entre Las Heras y Pagano","Zapiola y Dorrego","Av Brasil 1050 y Lima"]                                              | ["0 days 01:03:53.000000000","0 days 01:14:42.000000000","0 days 00:15:21.000000000"] | ["2017-01-10 18:06:47","2017-03-11 15:15:49","2017-08-14 07:36:20"]             | [96,20,132]                                    | ["Carlos Gardel","Distrito Audiovisual","Corrientes"]                            | [-58.4115848948388,-58.441788509931705,-58.3736760826555]   | [-34.602891143934,-34.5800361241865,-34.6031208697631]                                                | ["Guardia Vieja 3302","Zapiola y Dorrego","Av Corrientes y San Martín"]                                                       |
| 2018       | NA                                                            | [2018,2018,2018] | [360209,290561,119918]                                   | ["M","M","M"]              | ["2018-06-12 12:08:54","2018-06-19 17:22:48","2018-11-23 17:12:53"]             | [83,71,78]                                     | ["Paraná","Cerrito","Suipacha y Arroyo"]                                          | [-58.3884150937001,-58.3828429677206,-58.3803382442443]     | [-34.6030044362865,-34.6029957670657,-34.5914156869824]   | ["Lavalle enttre Montevideo y Paraná","Av. Roque Saenz Peña 1149 entre Libertad y Cerrito","Arroyo y Suipacha"]                           | ["0 days 00:16:51.000000000","0 days 00:28:29.000000000","0 days 00:15:09.000000000"] | ["2018-06-12 12:25:45","2018-06-19 17:51:17","2018-11-23 17:28:02"]             | [1,80,116]                                     | ["Facultad de Derecho","Doblas","Hospital Alemán"]                               | [-58.392452073017,-58.4303198693955,-58.4025983842195]      | [-34.5831330757635,-34.6241295471149,-34.5921042409009]                                               | ["Av. Pres.Figueroa Alcorta y Juan A.Bibiloni","Doblas 608 y Valle","Beruti y Ecuador"]                                       |
| 2019       | ["921302BAEcobici","2833480BAEcobici","3471233BAEcobici"]     | NA               | ["85265BAEcobici","116974BAEcobici","170699BAEcobici"]   | ["MALE","MALE","FEMALE"]   | ["2019-05-26 14:41:08","2019-07-29 08:44:20","2019-08-19 10:16:42"]             | ["14BAEcobici","135BAEcobici","28BAEcobici"]   | ["014 - Pacifico","135 - MARCELO T. DE ALVEAR","028 - Plaza Boedo"]               | [-58.426387,-58.377535,-58.4127377]                         | [-34.577424,-34.595125,-34.6231273]                       | ["Santa Fe Av. & Bullrich, Int. Av.","Av. Santa Fe 772","3310 Calvo, Carlos & Sanchez De Loria"]                                          | ["4,713",287,"4,981"]                                                                 | ["2019-05-26 15:59:41","2019-07-29 08:49:07","2019-08-19 11:39:43"]             | ["46BAEcobici","201BAEcobici","199BAEcobici"]  | ["046 - Chile","175 - Esmeralda y Corrientes","199 - ESTADOS UNIDOS Y BOEDO"]    | [-34.6163012,-34.6034449,-34.6222601]                       | ["-34.6163012,-58.3743749","-34.6034449,-58.378167","-34.6222601,-58.4160137"]                        | ["Calle Perú, 718","Esmeralda y Corrientes","3568 Estados Unidos & Boedo Av."]                                                |
| 2020       | ["8180453BAEcobici","8313522BAEcobici","8800385BAEcobici"]    | NA               | ["219006BAEcobici","679283BAEcobici","694919BAEcobici"]  | ["OTHER","MALE","MALE"]    | ["2020-08-24 20:34:18","2020-09-08 17:28:37","2020-10-21 15:20:26"]             | ["30BAEcobici","8BAEcobici","50BAEcobici"]     | ["030 - Peña","008 - Congreso","050 - Hospital Rivadavia"]                        | [-58.3973698,-58.3893364,-58.4010798]                       | [-34.5908211,-34.6094218,-34.5837348]                     | ["Peña & Azcuenaga","Cevallos, Virrey& Yrigoyen, Hipolito Av.","2516 Pereyra Lucena"]                                                     | ["1,206",741,"1,070"]                                                                 | ["2020-08-24 20:54:24","2020-09-08 17:40:58","2020-10-21 15:38:16"]             | ["207BAEcobici","171BAEcobici","200BAEcobici"] | ["123 - BASUALDO Y RODO","171 - Pasteur","200 - AUSTRIA Y FRENCH"]               | [-34.6523768530285,-34.6032813,-34.5890696]                 | ["-34.65237685302847,-58.487359356906865","-34.6032813,-58.3997553","-34.5890696,-58.40536170000001"] | ["Guardia Nacional 1700","519 Pasteur","Austria 2075"]                                                                        |
| 2021       | ["10766099BAEcobici","11864716BAEcobici","12621514BAEcobici"] | NA               | ["713597BAEcobici","169141BAEcobici","667131BAEcobici"]  | ["MALE","NA","NA"]         | ["2021-04-12 12:25:54","2021-08-27 09:38:27","2021-11-11 12:05:29"]             | ["166BAEcobici","36BAEcobici","24BAEcobici"]   | ["166 - Cementerio de Recoleta","036 - MAIPÚ","024 - ALSINA"]                     | [-58.3941479428656,-58.3767677,-58.3808943]                 | [-34.5883466632398,-34.6045481,-34.610583]                | ["Vicente López 2100","MAIPÙ 300","Adolfo Alsina& Bernardo De Irigoyen"]                                                                  | ["1,539",235,"2,548"]                                                                 | ["2021-04-12 12:51:33","2021-08-27 09:42:22","2021-11-11 12:47:57"]             | ["204BAEcobici","63BAEcobici","112BAEcobici"]  | ["167 - Hipólito Yrigoyen","063 - Reconquista","112 - 9 de Julio"]               | [-34.614948,-34.5986,-34.612075]                            | ["-34.614948,-58.427818","-34.5986,-58.373062","-34.612075,-58.380384"]                               | ["4300 Yrigoyen, Hipolito Av.","Reconquista & Cordoba Av.","Bernardo Irigoyen 320"]                                           |
| 2022       | ["13997559BAEcobici","14359417BAEcobici","15108734BAEcobici"] | NA               | ["695988BAEcobici","334516BAEcobici","347686BAEcobici"   | ["MALE","MALE","OTHER"]    | ["2022-03-30 16:38:46","2022-05-03 17:36:31","2022-08-01 16:48:14"]             | ["48BAEcobici","33BAEcobici","372BAEcobici"]   | ["034 - Colonia Express","033 - Facultad de Medicina","322 - MARTÍ Y DIRECTORIO"] | [-58.362131,-58.3989807,-58.470136]                         | [-34.624255,-34.5970909,-34.636406]                       | ["150 Dellepiane Y Pedro de Mendoza","Pres. José Evaristo Uriburu 987","404 Marti, Jose"]                                                 | [300,"1,619","1,305"]                                                                 | ["2022-03-30 16:43:46","2022-05-03 18:03:30","2022-08-01 17:09:59"]             | ["164BAEcobici","277BAEcobici","29BAEcobici"]  | ["164 - FACULTAD DE INGENIERIA","292 - PLAZA BOLIVIA","029 - Parque Centenario"] | [-58.3698984,-58.436115,-58.4335573]                        | [-34.617301,-34.563539,-34.6079414]                                                                   | ["AV. PASEO COLÓN 811","Olleros Av. & Del Libertador Av.","Av. Patricias Argentinas & Estivao"]                               |
| 2023       | ["17113752BAEcobici","19564621BAEcobici","19860669BAEcobici"] | NA               | ["921038BAEcobici","810735BAEcobici","698841BAEcobici"]  | ["MALE","MALE","MALE"]     | ["2023-02-02 07:10:19","2023-10-31 15:53:19","2023-11-28 07:11:05"]             | ["403BAEcobici","253BAEcobici","92BAEcobici"]  | ["316 - Buenos Aires","383 - BOEDO Y VENEZUELA","092 - Salcedo"]                  | [-58.3938759028758,-58.4170737,-58.4053386]                 | [-34.6446835804428,-34.6163544,-34.6316444]               | ["Suarez 3150","BOEDO 339","2908 Salcedo & Dean Funes"]                                                                                   | ["1,561",473,"1,208"]                                                                 | ["2023-02-02 07:36:20","2023-10-31 16:01:12","2023-11-28 07:31:13"]             | ["183BAEcobici","96BAEcobici","83BAEcobici"]   | ["183 - VIRREY CEVALLOS","096 - Carlos Gardel","083 - Paraná"]                   | [-58.3899728,-58.4116586,-58.3893728]                       | [-34.6156994,-34.6027814,-34.603269]                                                                  | ["Mexico 1652","3302 Guardia Vieja & Aguero","1590 Lavalle"]                                                                  |
| 2024       | ["21539831BAEcobici","20492993BAEcobici","21130066BAEcobici"] | NA               | ["1149656BAEcobici","841701BAEcobici","947675BAEcobici"] | ["MALE","FEMALE","FEMALE"] | ["2024-04-27 18:30:22","2024-01-29 08:51:00","2024-03-23 06:31:59"]             | ["156BAEcobici","534BAEcobici","118BAEcobici"] | ["156 - Plaza Alemania","081 - PARQUE DE LAS CIENCIAS","118 - MEXICO"]            | [-58.4074696,-58.42997930000001,-58.4026531]                | [-34.5775895,-34.5829625,-34.6170196]                     | ["2939 Cavia","Soler 5300","Saavedra & Mexico"]                                                                                           | ["1,126",545,307]                                                                     | ["2024-04-27 18:49:08","2024-01-29 09:00:05","2024-03-23 06:37:06"]             | ["177BAEcobici","101BAEcobici","162BAEcobici"] | ["177 -PLANETARIO","101 - Fitz Roy","162 - LARREA Y BARTOLOMÉ MITRE"]            | [-58.412121,-58.4424397,-58.401924]                         | [-34.568165,-34.5891857,-34.608985]                                                                   | ["Av Casares y Av Belisario Roldan","Fitz Roy 1092 & Loyola","80 Larrea"]                                                     |
```


En base a la observación de los datos, se puede observar que:

- En los años que la tabla cuenta con `id`, se observa que en 2014 se identificaba univocamente el recorrido con un campo numérico, pero de 2019 en adelante, el campo `id` es un string que comienza con una secuencia de numeros (se asume que seria el `id` numerico) agregandole un postfijo `BAEcobici`.
- La columna de `id_usuario` en los años 2013 y 2018, el dato era númerico, pero en los años 2019-2024 el dato es un string que comienza con una secuencia de numeros (se asume que seria el `id` numerico) pero se le agrega un postfijo `"BAEcobici"`.
- La columna de `genero` en los años 2016-2018, el dato era `M` y `F`, pero en los años 2019-2024 el dato es `MALE`, `FEMALE`, `OTHER`, `NA`,
- La columna de `origen_fecha` y `destino_fecha` en 2010, el formato del valor es `DD/MM/YYYY HH:MM:SS`, en 2012-2014 el formato paso a ser `YYYY-MM-DD HH:MM:SS.SSS`, en 2015-2018 el formato paso a ser `YYYY-MM-DD HH:MM:SS`, y en 2019-2024 el formato paso a ser `YYYY-MM-DD HH:MM:SS.SSS`. NOTA: Se encontraron valores nulos.
- La columna de `origen_id` de 2010-2018 (con excepcion de 2014) el dato es numerico, pero en 2019-2024 el dato es un string que comienza con una secuencia de numeros (se asume que seria el `id` numerico) pero se le agrega un postfijo `"BAEcobici"`.
- La columna de `origen_long`, `origen_lat` se encuentra presente de 2010 a 2024 con excepcion de 2014. Ademas, en 2012, el dato esta cruzado, o sea, el valor en `origen_long` es el valor de `origen_lat` y viceversa.
- La columna `origen_domicilio` es un simple campo de texto.
- La columna `duracion` es un campo numerico que representa la duracion del recorrido. En base a la observacion de los campos, de 2010-2012, representa "minutos". Sin embargo, entre los años 2013, 2015-2018 el dato es un "string" con formato con `D days HH:MM:SS.SSSSSS`. Luego de 2019-2024, la unidad del dato es en segundos pero se presenta como un "string" ya que cuenta con una "," para los miles, lo cual no es un formato correspondiente a un dato numerico.

Otro punto a destacar es que en nuestro muestreo realizado, se observó que un valor en `destino_fecha` de 2016 es nulo, por lo que nos obliga a tener que hacer una investigación con respecto a cuantos valores nulos existen en cada una de las columnas de cada año.

```bash


```

Se obtuvo la siguiente tabla:

| year | column_name                | null_count | empty_string_count | row_count | null_rate        |
| ---- | -------------------------- | ---------- | ------------------ | --------- | ---------------- |
| 2017 | fecha_destino_recorrido    | 544906     | 0                  | 1048158   | 51.98700959      |
| 2016 | fecha_destino_recorrido    | 93555      | 0                  | 596807    | 15.67592203      |
| 2013 | id_estacion_destino        | 37089      | 0                  | 1067633   | 3.473946572      |
| 2013 | nombre_estacion_destino    | 37089      | 0                  | 1067633   | 3.473946572      |
| 2013 | long_estacion_destino      | 37089      | 0                  | 1067633   | 3.473946572      |
| 2013 | lat_estacion_destino       | 37089      | 0                  | 1067633   | 3.473946572      |
| 2013 | domicilio_estacion_destino | 37089      | 0                  | 1067633   | 3.473946572      |
| 2013 | id_estacion_origen         | 35156      | 0                  | 1067633   | 3.292891846      |
| 2013 | nombre_estacion_origen     | 35156      | 0                  | 1067633   | 3.292891846      |
| 2013 | long_estacion_origen       | 35156      | 0                  | 1067633   | 3.292891846      |
| 2013 | lat_estacion_origen        | 35156      | 0                  | 1067633   | 3.292891846      |
| 2013 | domicilio_estacion_origen  | 35156      | 0                  | 1067633   | 3.292891846      |
| 2019 | género                     | 93571      | 0                  | 6217004   | 1.505081869      |
| 2020 | género                     | 17155      | 0                  | 2415597   | 0.7101764077     |
| 2015 | long_estacion_destino      | 3462       | 0                  | 503252    | 0.687925731      |
| 2015 | lat_estacion_destino       | 3462       | 0                  | 503252    | 0.687925731      |
| 2015 | domicilio_estacion_destino | 3462       | 0                  | 503252    | 0.687925731      |
| 2015 | long_estacion_origen       | 3168       | 0                  | 503252    | 0.629505695      |
| 2015 | lat_estacion_origen        | 3168       | 0                  | 503252    | 0.629505695      |
| 2015 | domicilio_estacion_origen  | 3168       | 0                  | 503252    | 0.629505695      |
| 2022 | Género                     | 16306      | 0                  | 2922805   | 0.5578887404     |
| 2023 | género                     | 11966      | 0                  | 2622331   | 0.4563115793     |
| 2012 | id_estacion_destino        | 2849       | 0                  | 663406    | 0.4294504421     |
| 2012 | nombre_estacion_destino    | 2849       | 0                  | 663406    | 0.4294504421     |
| 2012 | lat_estacion_destino       | 2849       | 0                  | 663406    | 0.4294504421     |
| 2012 | long_estacion_destino      | 2849       | 0                  | 663406    | 0.4294504421     |
| 2012 | domicilio_estacion_destino | 2849       | 0                  | 663406    | 0.4294504421     |
| 2012 | id_estacion_origen         | 2487       | 0                  | 663406    | 0.3748835555     |
| 2012 | nombre_estacion_origen     | 2487       | 0                  | 663406    | 0.3748835555     |
| 2012 | lat_estacion_origen        | 2487       | 0                  | 663406    | 0.3748835555     |
| 2012 | long_estacion_origen       | 2487       | 0                  | 663406    | 0.3748835555     |
| 2012 | domicilio_estacion_origen  | 2487       | 0                  | 663406    | 0.3748835555     |
| 2021 | Género                     | 10348      | 0                  | 2860091   | 0.3618066698     |
| 2024 | género                     | 3626       | 0                  | 1067623   | 0.3396329978     |
| 2017 | id_estacion_destino        | 3496       | 0                  | 1048158   | 0.333537501      |
| 2017 | long_estacion_destino      | 3496       | 0                  | 1048158   | 0.333537501      |
| 2017 | lat_estacion_destino       | 3496       | 0                  | 1048158   | 0.333537501      |
| 2017 | domicilio_estacion_destino | 3496       | 0                  | 1048158   | 0.333537501      |
| 2017 | id_estacion_origen         | 3419       | 0                  | 1048158   | 0.3261912803     |
| 2017 | long_estacion_origen       | 3419       | 0                  | 1048158   | 0.3261912803     |
| 2017 | lat_estacion_origen        | 3419       | 0                  | 1048158   | 0.3261912803     |
| 2017 | domicilio_estacion_origen  | 3419       | 0                  | 1048158   | 0.3261912803     |
| 2021 | género                     | 8340       | 0                  | 2860091   | 0.2915991135     |
| 2012 | duracion_recorrido         | 652        | 0                  | 663406    | 0.09828069086    |
| 2010 | duracion_recorrido         | 3          | 0                  | 3158      | 0.09499683344    |
| 2011 | id_estacion_destino        | 178        | 0                  | 407956    | 0.04363215641    |
| 2011 | long_estacion_destino      | 178        | 0                  | 407956    | 0.04363215641    |
| 2011 | lat_estacion_destino       | 178        | 0                  | 407956    | 0.04363215641    |
| 2011 | domicilio_estacion_destino | 178        | 0                  | 407956    | 0.04363215641    |
| 2011 | duracion_recorrido         | 148        | 0                  | 407956    | 0.03627842218    |
| 2019 | id_estacion_destino        | 1760       | 0                  | 6217004   | 0.02830945581    |
| 2019 | nombre_estacion_destino    | 1760       | 0                  | 6217004   | 0.02830945581    |
| 2019 | direccion_estacion_destino | 1760       | 0                  | 6217004   | 0.02830945581    |
| 2019 | lat_estacion_destino       | 1760       | 0                  | 6217004   | 0.02830945581    |
| 2011 | id_estacion_origen         | 85         | 0                  | 407956    | 0.02083558031    |
| 2011 | nombre_estacion_origen     | 85         | 0                  | 407956    | 0.02083558031    |
| 2011 | long_estacion_origen       | 85         | 0                  | 407956    | 0.02083558031    |
| 2011 | lat_estacion_origen        | 85         | 0                  | 407956    | 0.02083558031    |
| 2011 | domicilio_estacion_origen  | 85         | 0                  | 407956    | 0.02083558031    |
| 2020 | id_estacion_destino        | 41         | 0                  | 2415597   | 0.001697302986   |
| 2020 | nombre_estacion_destino    | 41         | 0                  | 2415597   | 0.001697302986   |
| 2020 | direccion_estacion_destino | 41         | 0                  | 2415597   | 0.001697302986   |
| 2020 | lat_estacion_destino       | 41         | 0                  | 2415597   | 0.001697302986   |
| 2023 | id_estacion_destino        | 2          | 0                  | 2622331   | 0.00007626802261 |
| 2023 | nombre_estacion_destino    | 2          | 0                  | 2622331   | 0.00007626802261 |
| 2023 | direccion_estacion_destino | 2          | 0                  | 2622331   | 0.00007626802261 |

Lo que podemos concluir de la tabla es que:

* La columna `fecha_destino_recorrido` de 2016 y 2017 tiene un alto porcentaje de valores nulos, por encima de 50%, que estaria fuera de los valores aceptables para tomar la tabla como valida. Sin embargo, si notamos con detenimiento, en 2016 con valores aceptables para las columnas `fecha_origen_recorrido` y `duracion`, por lo que se podria reconstruir la columna `fecha_destino_recorrido` a partir de tomar la fecha de origen y sumarle la duración del recorrido. Esto, asumiendo de que una `fecha_destino_recorrido` nula es un error de carga de datos y no tiene un significado como tal (que el recorrido no haya finalizado o que la bicicleta no haya sido devuelta).
* Por otro lado, los demas valores presentan un porcentaje de valores nulos aceptables, por debajo del 5%, por lo que a la hora de realizar el merge de los datos, se podrian descartar los registros con valores invalidos o nulos para no afectar la calidad del analisis (recordemos, estamos intentando hacer un analisis aproximado y exploratorio de los datos, con un rango de error aceptable).

#### 👉 Con respecto a las estaciones

Haciendo investigacion sobre las **estaciones**, se observa que en 2019 se realizo una gran migración de las estaciones, donde se cambio tanto los ids y los nombres de la estaciones.

Se puede observar que se han mantenido los ids entre 2010 a 2018, con excepción de 2014 que solamente se usa el nombre como identificador de la estacion. 

Dado que no contamos con un dataset de estaciones por año, se elaboró un script automatico para listar todas las estaciones a partir de los recorridos realizados, el cual se realizo de la siguiente forma:

- Se recorrio cada uno de los datasets de recorridos realizados por año, de forma ascendente (de 2010 a 2024).
- Cada vez que se encontraba una __nueva__ estación, tanto como origen o destino, se guardaba en un "set" de estaciones (identificados univocamente por su id) su año (que por primera vez se encontraba), nombre, domicilio, latitud y longitud.

```bash
zaqueo@mapache:~/dev/baecobici-data-report$ node recorridos-get-stations-per-year.js
Processing data/original/recorridos_realizados_2010.csv
-- Completed data/original/recorridos_realizados_2010.csv (took 0s)
Processing data/original/recorridos_realizados_2011.csv
-- Completed data/original/recorridos_realizados_2011.csv (took 2s)
Processing data/original/recorridos_realizados_2012.csv
-- Completed data/original/recorridos_realizados_2012.csv (took 3s)
Processing data/original/recorridos_realizados_2013.csv
-- Completed data/original/recorridos_realizados_2013.csv (took 6s)
Processing data/original/recorridos_realizados_2014.csv
-- Completed data/original/recorridos_realizados_2014.csv (took 2s)
Processing data/original/recorridos_realizados_2015.csv
-- Completed data/original/recorridos_realizados_2015.csv (took 3s)
Processing data/original/recorridos_realizados_2016.csv
-- Completed data/original/recorridos_realizados_2016.csv (took 3s)
Processing data/original/recorridos_realizados_2017.csv
-- Completed data/original/recorridos_realizados_2017.csv (took 7s)
Processing data/original/recorridos_realizados_2018.csv
-- Completed data/original/recorridos_realizados_2018.csv (took 22s)
Processing data/original/recorridos_realizados_2019.csv
-- Completed data/original/recorridos_realizados_2019.csv (took 96s)
Processing data/original/recorridos_realizados_2020.csv
-- Completed data/original/recorridos_realizados_2020.csv (took 37s)
Processing data/original/recorridos_realizados_2021.csv
-- Completed data/original/recorridos_realizados_2021.csv (took 44s)
Processing data/original/recorridos_realizados_2022.csv
-- Completed data/original/recorridos_realizados_2022.csv (took 46s)
Processing data/original/recorridos_realizados_2023.csv
-- Completed data/original/recorridos_realizados_2023.csv (took 41s)
Processing data/original/recorridos_realizados_2024.csv
-- Completed data/original/recorridos_realizados_2024.csv (took 14s)
Done!
Stations Count:  727
Done! Saving file...
```

Claramente, como en 2019 cambió el formato de los ids de las estaciones, se puede observar que las estaciones de 2010-2018 son un subconjunto de las estaciones de 2019-2024 (con algunas excepciones de algunas estaciones que pudieron haber desaparecido en el tiempo, se asume)

Sin embargo, no se puede realizar un script automatico para hacer el matcheo de los ids de las estaciones, por lo que se realizó un matcheo manual de las mismas en base a nombre y ubicación de las estaciones. 

Haciendo una curadoria manual, se compuso la tabla `data/stations_master.csv`, que se procederá a explicar su composición en la proxima sección.


## ⚙️ Transformación de los datos

En esta etapa, se procedera a realizar la sanitización y transformación de los datos. Para eso, se realizará lo siguiente:

- Se definirá una estructura unica para cada una de las tablas maestras, tanto para usuarios, estaciones y recorridos.
- Para las tablas de usuarios y estaciones, por cada año, se elaborará un procedimiento de transformacion de cada registro, debido a las diferencias detectadas tanto en las estructuras de las tablas como en el formato de los valores.

### 🚦 Tabla de Estaciones

A continuación, se describe en detalle cómo se realizó la transformación de los datos de cada archivo de recorridos anuales en CSV utilizando un algoritmo implementado en JavaScript.

#### Extracción y Lectura de Archivos

Para cada año, se leyo el archivo `recorridos_realizados_{year}.csv` correspondiente. La lectura de los archivos se realizó utilizando el módulo `fs` de Node.js y la biblioteca `PapaParse` para manejar la conversión de CSV a JSON. Los archivos se procesaron secuencialmente desde 2010 hasta 2024.

#### Transformación de Datos

El script `recorridos-get-stations-per-year.js` procesa filas de datos de estaciones de bicicletas de diferentes años. Cada función `processRowXXXX` (donde `XXXX` es el año) se encarga de procesar los datos de un año específico. A continuación, se detalla el proceso general y las particularidades de cada año.

**Proceso General**

* **Verificación de Valores Nulos**: Para cada fila de datos, se verifica si contiene valores nulos. Si se encuentra algún valor nulo, la fila se omite y no se procesa.
* **Búsqueda de Estaciones Existentes**: Se busca en el arreglo `csvJson` si ya existe una estación con el mismo `station_id` (y en algunos casos, también se verificaba el station_name, pero esta verificación fue comentada y no se utiliza).
* **Inserción de Nuevas Estaciones**: Si la estación no existe en `csvJson`, se inserta un nuevo objeto con los datos de la estación, incluyendo el año, identificador, nombre, latitud, longitud y dirección de la estación.

**Particularidades por Año**

* **2010 a 2013**: Las funciones processRow2010 a processRow2013 siguen un patrón similar, procesando tanto las estaciones de origen como las de destino de cada fila. Los nombres de las columnas varían ligeramente entre estos años, pero la estructura básica de los datos y el proceso es el mismo.
* **2014**: La función `processRow2014` maneja un formato de datos diferente, donde los nombres de las columnas han cambiado significativamente (`NOMBRE_ORIGEN` y `DESTINO_ESTACION`). En este año, no se dispone de datos de identificación, latitud, longitud ni dirección de las estaciones, por lo que estos campos se insertan con valores nulos en `csvJson`.

#### Integración Final y Almacenamiento

Una vez procesados todos los años, se almacenaron los datos transformados en un archivo maestro en formato CSV (`data/recorridos_get_stations_per_year.csv`). Este archivo es un primer paso para luego hacer un match de las estaciones de 2010-2018 con las estaciones de 2019-2024, y así poder tener un identificador unico para cada estacion. Ese trabajo se realizo por fuera, en Google Sheets, y se consolido un archivo `data/stations_master.csv` que contiene la información normalizada de todas las estaciones a lo largo de los años, lista para su análisis y uso en etapas posteriores del proyecto.

La estructura de la tabla se compone de:

| column  | type | description | 
|---------|-------------|-------------|
|`id` | `string` | Id de la estación de acuerdo al formato de los ids de 2019-2024 |
|`name` | `string` | Nombre de la estación |
|`latitude` | `float` | Latitud de la estación |
|`longitude` | `float` | Longitud de la estación |
|`address` | `string` | Domicilio de la estación |
|`year` | `int` | Año en el que se encontraba la estación |
|`id_2010_2019` | `int` | Id de la estación de acuerdo al formato de los ids de 2010-2018 |
|`id_2014` | `string` | Nombre de la estación, que funciona tambien como id |

### 👥 Tabla de los usuarios

A continuación, se describe en detalle cómo se realizó la transformación de los datos de cada archivo CSV anual utilizando un algoritmo implementado en JavaScript.

#### Extracción y Lectura de Archivos

Para cada año, se leyó el archivo `usuarios_ecobici_{year}.csv` correspondiente. La lectura de los archivos se realizó utilizando el módulo `fs` de Node.js y la biblioteca `PapaParse` para manejar la conversión de CSV a JSON. Los archivos se procesaron secuencialmente desde 2015 hasta 2024.

#### Transformación de Datos

Durante el proceso de transformación, se aplicaron diferentes funciones de normalización según las especificaciones y formatos de los datos en cada año. A continuación, se detalla el tratamiento de los datos para cada año:

**Años 2015 a 2018:**

* **Género del Usuario:** Los valores de género ('F', 'M', 'O', 'NA') se convirtieron a ('female', 'male', 'other', null) respectivamente mediante la función `getGenreByLetter2015to2018`.
* **Edad del Usuario:** Se verificó si la edad era un número válido mediante la función `getAge`. Además, se determinaron dos banderas booleanas:
   - `age_out_of_tos`: Indica si la edad es menor de 16 o mayor de 100.
   - `age_out_of_bounds`: Indica si la edad es menor de 0 o mayor de 100.
* **Fecha y Hora de Alta:** La fecha y hora se convirtieron al formato `YYYY-MM-DD HH:MM:SS` mediante la función `convertDateTime2015To2018`.

**Años 2019 a 2024:**

* **Género del Usuario:** Los valores de género ('MALE', 'FEMALE', 'OTHER', null) se convirtieron a ('male', 'female', 'other', null) mediante la función `getGenre2019to2024`.
* **Edad del Usuario:** Similar a los años anteriores, se verificó si la edad era un número válido y se establecieron las banderas `age_out_of_tos` y `age_out_of_bounds`.
* **Fecha y Hora de Alta:** La fecha y hora se normalizaron utilizando la biblioteca `dayjs`.
* **DNI del Usuario:** Para los años 2020 en adelante, se incluyó una columna adicional que indica si el usuario tiene DNI ('Yes', 'No', null), la cual se transformó a valores booleanos mediante la función `getCustomerHasDni`.

#### Ejecución del Proceso

El proceso de transformación de cada fila de datos se llevó a cabo utilizando funciones específicas para cada año (`processRow{year}`). A continuación se presenta un ejemplo de cómo se procesó una fila del año 2015:

```javascript
function processRow2015(row) {
  csvJson.push({
    user_id: Number(row.id_usuario),
    year: 2015,
    genre: getGenreByLetter2015to2018(row.genero_usuario),
    age: getAge(row.edad_usuario),
    age_out_of_tos: getAgeOutOfToS(row.edad_usuario),
    age_out_of_bounds: getAgeOutOfBounds(row.edad_usuario),
    created_at: convertDateTime2015To2018(`${row.fecha_alta} ${row.hora_alta}`),
    has_dni: null
  });
}
```

#### Integración Final y Almacenamiento

Una vez procesados todos los años, se almacenaron los datos transformados en un archivo maestro en formato CSV (`data/users_master.csv`). Este archivo consolidado contiene la información normalizada de todos los usuarios a lo largo de los años, lista para su análisis y uso en etapas posteriores del proyecto.

La estructura de la tabla se compone de:

| column  | type | description |
|---------|-------------|-------------|
|`id` | `int` | Id del usuario |
|`user_id` | `string` | Id del usuario de acuerdo al formato de los ids de 2019-2024. Ex: '129BAEcobici' |
|`year` | `int` | Año en el que se registro el usuario, en formato YYYY |
|`genre` | `string` | Genero del usuario. Valores: `male`, `female`, `other`, and `null` |
|`age` | `int` | Edad del usuario en el momento del registro |
|`age_out_of_tos` | `bool` | Determina si la edad del usuario está fuera de los terminos y condiciones de uso de la plataforma de BA Ecobici |
|`age_out_of_bounds` | `bool` | Determina si la edad del usuario está de un rango "normal" |
|`has_dni` | `bool` | Si el usuario informó su DNI en el sistema. Nota: `null` se considera que el dato no está disponible, que es diferente a `false` | 
|`created_at` | `datetime` | Fecha de registro del usuario en el sistema |


### 🚲 Tabla de los recorridos

#### Extracción y lectura de archivos

Para cada año, se leyó el archivo `recorridos_realizados_{year}.csv` correspondiente. La lectura de los archivos se realizó utilizando el módulo `fs` de Node.js y la biblioteca `PapaParse` para manejar la conversión de CSV a JSON. Los archivos se procesaron secuencialmente desde 2010 hasta 2024.

#### Transformación de Datos

La transformación de datos es el núcleo del script proporcionado. Se realiza en varias etapas, teniendo en cuenta especificidades por año y aspectos generales aplicables a todos los datos.

**Específico por año**

* **2010 a 2018**: Para estos años, se utiliza la función getStationId2010To2018 para mapear los identificadores de estaciones a su correspondiente formato. Esto es necesario debido a cambios en los sistemas de identificación de estaciones a lo largo de los años.
* **2014**: Aunque no se muestra un procesamiento específico para este año en el fragmento de código, se proporciona una función `getStationId2014` que sugiere un tratamiento especial para los identificadores de estaciones de este año.
* **2019 a 2024**: Se utiliza `getStationId2019To2024` para obtener los identificadores de estaciones, indicando posibles cambios en el esquema de identificación a partir de 2019.
* **2012 a 2014**: Para el procesamiento de fechas, se utiliza `processDate2012to2014`, lo que implica que hubo variaciones en el formato de fecha durante estos años que requirieron un tratamiento especial.

**General**
* **Verificación de valores vacíos**: Antes de procesar cada fila, se verifica la presencia de valores esenciales como identificadores de estación y fechas de origen/destino. Esto asegura la integridad de los datos.
* **Cálculo de distancia**: Independientemente del año, se calcula la distancia entre la estación de origen y destino utilizando `getDistanceFromLatLonInKm`, lo que implica que las coordenadas geográficas de las estaciones están disponibles y son consistentes a lo largo de los años.
* **Transformación de duración**: La duración del recorrido se transforma a segundos para estandarizar esta medida, utilizando `transformMinutesToSeconds` o `transformDurationStringToSeconds` dependiendo del formato de entrada.
* **Normalización de fechas**: Las fechas se normalizan a un formato estándar `yyyy-mm-dd hh:mm:ss` utilizando funciones como `processDate2010` y `processDate2012to2014`, lo que facilita su manejo y comparación.
* **Consolidación de datos**: Finalmente, todos los datos transformados se consolidan en una estructura unificada (csvJson), preparada para su análisis o almacenamiento posterior.

A continuación se presenta el log del procesamiento de los recorridos para todos los años:

```bash
zaqueo@mapache:~/dev/baecobici-data-report$ node recorridos-merge-to-master.js
Loading stations...
-- Stations loaded. Count:  501
Processing recorridos-realizados-2010.csv
-- Completed recorridos-realizados-2010.csv (took 0s)
Processing recorridos-realizados-2011.csv
-- Completed recorridos-realizados-2011.csv (took 2s)
Processing recorridos-realizados-2012.csv
-- Completed recorridos-realizados-2012.csv (took 4s)
Processing recorridos-realizados-2013.csv
-- Completed recorridos-realizados-2013.csv (took 10s)
Processing recorridos-realizados-2014.csv
-- Completed recorridos-realizados-2014.csv (took 6s)
Processing recorridos-realizados-2015.csv
-- Completed recorridos-realizados-2015.csv (took 4s)
Processing recorridos-realizados-2016.csv
-- Completed recorridos-realizados-2016.csv (took 9s)
Processing recorridos-realizados-2017.csv
-- Completed recorridos-realizados-2017.csv (took 16s)
Processing recorridos-realizados-2018.csv
-- Completed recorridos-realizados-2018.csv (took 47s)
Processing recorridos-realizados-2019.csv
-- Completed recorridos-realizados-2019.csv (took 106s)
Processing recorridos-realizados-2020.csv
-- Completed recorridos-realizados-2020.csv (took 38s)
Processing recorridos-realizados-2021.csv
-- Completed recorridos-realizados-2021.csv (took 46s)
Processing recorridos-realizados-2022.csv
-- Completed recorridos-realizados-2022.csv (took 47s)
Processing recorridos-realizados-2023.csv
-- Completed recorridos-realizados-2023.csv (took 41s)
Processing recorridos-realizados-2024.csv
-- Completed recorridos-realizados-2024.csv (took 14s)
Done!
Stations Count:  501
Last row id:  25644951
Rows processed:  26085395
Rows correct:  26000089
Rows discarded for incomplete data:  85306
Rows with invalid stations:  355138
Rows incorrect 440444
Percentage of rows discarded:  0.3270259085591765 %
Percentage of rows with invalid stations:  1.36144382709175 %
Percentage of rows incorrect:  1.6884697356509264 %
Done!
```

Una vez que se procesaron 26085395 registros de los recorridos, podemos observar que se descartaron un 0.32% de los registros por datos incompletos, un 1.36% por estaciones invalidas, siendo asi un total de 1.68% de los registros incorrectos, que en valores absolutos, serian 440444 registros de un total de 26000089 registros correctos.


#### Integración Final y Almacenamiento

Una vez procesados todos los años, se almacenaron los datos transformados en varios archivos en formato CSV (`data/trips_master_{YYYY}_{#}.csv`). El algoritmo, por año, guarda los datos en archivos separados para facilitar luego su carga en una base de datos relacional, en nuestro caso, MySQL. Dado que contamos con un numero de registros considerable, se opto por dividir los datos en archivos de 3.000.000 de registros cada uno, para facilitar la carga en la base de datos.

La estructura de la tabla se compone de:

| column  | type | description |
|---------|-------------|-------------|
|`id` | `int` | Id del recorrido |
|`id_trip` | `string` | Id del recorrido (de haber uno) NOTA: puede haber valores en `null` |
|`year` | `int` | Año en el que se realizó el recorrido en formato YYYY |
|`id_user` | `int` | Id del usuario que realizó el recorrido en formato númerico (sin el 'BAEcobici' para los años 2019-2024) |
|`origin_id` | `string` | Id de la estación de origen de acuerdo al formato de los ids de 2019-2024 |
|`origin_date` | `datetime` | Fecha de inicio del recorrido en formato YYYY-MM-DD HH:MM:SS |
|`destination_id` | `string` | Id de la estación de destino de acuerdo al formato de los ids de 2019-2024 |
|`destination_date` | `datetime` | Fecha de fin del recorrido en formato YYYY-MM-DD HH:MM:SS |
|`distance` | `float` | Distancia del recorrido en KM, calculado por la distancia entre las coordenadas de origen y destino. Nota: Puede haber registros con distancia 0, que se entienden como recorridos que comenzaron y terminaron en la misma estación |
|`duration` | `int` | Duración del recorrido en segundos |

- Algunos datasets de este recurso, no cuentan con los metadatos respectivos de cada una de las columnas. [text](https://data.buenosaires.gob.ar/dataset/bicicletas-publicas/resource/juqdkmgo-2213-resource)


## 📊 Almacenamiento

Como habiamos mencionado al inicio del reporte, manejar una gran cantidad de datos para trabajar con Looker Studio iba a representar un desafio. Es por eso que se opto por cargar los datos en una base de datos relacional, en este caso, MySQL.

Para eso se utilizará de DigitalOcean un "managed database" de MySQL, que nos permitirá cargar los datos de forma segura y eficiente.

![MySQL Configuration](/images/mysql-configuration.png)

### Creación de las Base de Datos

Se crearán tres tablas en la base de datos `ecobici`:

- `stations`: Contiene la información de las estaciones de bicicletas a lo largo de los años.
- `users`: Contiene la información de los usuarios de BA Ecobici a lo largo de los años.
- `trips`: Contiene la información de los recorridos realizados por los usuarios de BA Ecobici a lo largo de los años.

A continuación se presentan las definiciones de las tablas


```sql
CREATE TABLE "stations" (
  "id" char(50) COLLATE utf8mb4_general_ci NOT NULL,
  "name" text COLLATE utf8mb4_general_ci NOT NULL,
  "latitude" char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  "longitude" char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  "address" text COLLATE utf8mb4_general_ci NOT NULL,
  "year" smallint unsigned DEFAULT NULL,
  "id_2010_2019" tinyint unsigned DEFAULT NULL,
  "id_2014" char(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY ("id"),
  KEY "id_2010_2019" ("id_2010_2019"),
  KEY "id_2014" ("id_2014")
);

ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

```

```sql
-- ecobici.users definition

CREATE TABLE "users" (
  "id" int NOT NULL AUTO_INCREMENT,
  "user_id" varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  "year" smallint DEFAULT NULL,
  "genre" varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  "age" int DEFAULT NULL,
  "age_out_of_tos" tinyint DEFAULT NULL,
  "age_out_of_bounds" tinyint DEFAULT NULL,
  "has_dni" tinyint DEFAULT NULL,
  "created_at" datetime DEFAULT NULL,
  PRIMARY KEY ("id")
);

ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;
```

```sql
-- ecobici.trips definition

CREATE TABLE "trips" (
  "id" int NOT NULL AUTO_INCREMENT,
  "id_trip" varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  "year" smallint DEFAULT NULL,
  "id_user" int DEFAULT NULL,
  "origin_id" varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  "origin_date" datetime DEFAULT NULL,
  "destination_id" varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  "destination_date" datetime DEFAULT NULL,
  "distance" decimal(8,4) DEFAULT NULL,
  "duration" int DEFAULT NULL,
  PRIMARY KEY ("id"),
  KEY "origin_id" ("origin_id"),
  KEY "destination_id" ("destination_id")
);

ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

```

La forma de carga de los registros se hizo utilizando [DBeaver](https://dbeaver.io/), una herramienta de administración de bases de datos que permite la carga de datos de forma masiva y eficiente.

![DBeaver Data Load](/images/dbeaver-upload-batch.png)

## 📈 Análisis de los datos

El analisis de los datos se hará en Looker Studio, una herramienta de BI que permite la visualización de los datos de forma sencilla y eficiente.

Para eso, se procederá a conectar la base de datos de MySQL con Looker Studio, y se crearan los dashboards correspondientes para cada una de las tablas.

### Conexión de la Base de Datos

Para conectar la base de datos de MySQL con Looker Studio

![MySQL Driver](/images/looker-mysql-connection.png)



### Tablas auxiliares

Para mejorar la performance de las consultas, se crearon tablas extras de datos extraidos de `trips` & `stations`.

```sql
-- Tabla para definir cuantos recorridos hubo desde una estacion X hasta otra estación Y
CREATE TABLE `trips_stations` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`year_trip` VARCHAR(10) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`origin_id` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`destination_id` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`trip_stations_count` BIGINT(20) UNSIGNED NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `year_trip` (`year_trip`) USING BTREE,
	INDEX `origin_id` (`origin_id`) USING BTREE,
	INDEX `destination_id` (`destination_id`) USING BTREE,
	INDEX `origin_id_destination_id` (`origin_id`, `destination_id`) USING BTREE
) COLLATE='utf8mb4_general_ci';

-- Query para poblar la tabla "trips_stations"
INSERT INTO ecobici.trips_stations (year_trip, origin_id, destination_id, trip_stations_count)
SELECT t.year_trip, t.origin_id, t.destination_id, COUNT(0) AS trip_stations_count
FROM ecobici.trips t
GROUP BY t.year_trip, t.origin_id, t.destination_id;

-- Tabla para definir cuantos recorridos hubo por año, donde la estacion de origen es distinta a la estacion de destino
CREATE TABLE `trips_stations_loops` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`year_trip` VARCHAR(10) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`origin_id` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`destination_id` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`trip_stations_count` BIGINT(20) UNSIGNED NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `year_trip` (`year_trip`) USING BTREE,
	INDEX `origin_id` (`origin_id`) USING BTREE,
	INDEX `destination_id` (`destination_id`) USING BTREE,
	INDEX `origin_id_destination_id` (`origin_id`, `destination_id`) USING BTREE
) COLLATE='utf8mb4_general_ci';

-- Query para poblar la tabla "trips_stations_loops"
INSERT INTO ecobici.trips_stations_loops (year_trip, origin_id, destination_id, trip_stations_count)
SELECT t.year_trip, t.origin_id, t.destination_id, COUNT(0) AS trip_stations_count
FROM ecobici.trips t
WHERE t.origin_id = t.destination_id
GROUP BY t.year_trip, t.origin_id, t.destination_id;

-- Tabla para definir cuantos recorridos hubo por año, donde la estacion de origen es distinta a la estacion de destino
CREATE TABLE `trips_stations_no_loops` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`year_trip` VARCHAR(10) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`origin_id` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`destination_id` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`trip_stations_count` BIGINT(20) UNSIGNED NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `year_trip` (`year_trip`) USING BTREE,
	INDEX `origin_id` (`origin_id`) USING BTREE,
	INDEX `destination_id` (`destination_id`) USING BTREE,
	INDEX `origin_id_destination_id` (`origin_id`, `destination_id`) USING BTREE
) COLLATE='utf8mb4_general_ci';

-- Query para poblar la tabla "trips_stations_no_loops"
INSERT INTO ecobici.trips_stations_no_loops (year_trip, origin_id, destination_id, trip_stations_count)
SELECT t.year_trip, t.origin_id, t.destination_id, COUNT(0) AS trip_stations_count
FROM ecobici.trips t
WHERE t.origin_id <> t.destination_id
GROUP BY t.year_trip, t.origin_id, t.destination_id;
```

Las siguientes tablas tambien son para poder hacer metricas de los usuarios y los recorridos (solamente en los periodos 2018-2024)

```sql

CREATE TABLE `trips_top_users` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`year_trip` VARCHAR(10) NOT NULL COLLATE 'utf8mb4_general_ci',
	`user_id` INT(10) UNSIGNED NOT NULL DEFAULT '0',
	`total_trips` BIGINT(19) NOT NULL DEFAULT '0',
	`age` INT(10) NULL DEFAULT NULL,
	`genre` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`year_created_at` VARCHAR(10) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `year_trip` (`year_trip`) USING BTREE,
	INDEX `user_id` (`user_id`) USING BTREE,
	INDEX `year_trip_user_id` (`year_trip`, `user_id`) USING BTREE
) COLLATE='utf8mb4_general_ci';

-- Query Insert Top 50 usuarios que viajaron mas.
INSERT INTO ecobici.trips_top_users (year_trip, user_id, total_trips, age, genre, year_created_at)
SELECT "ranked"."year_trip" AS "year_trip",
       "ranked"."user_id" AS "user_id",
       "ranked"."total_trips" AS "total_trips",
       "ranked"."age" AS "age",
       "ranked"."genre" AS "genre",
       "ranked"."year_created_at" AS "year_created_at"
FROM  (
  SELECT "t"."year_trip" AS "year_trip",
          "t"."user_id" AS "user_id",
          "t"."total_trips" AS "total_trips",
          row_number() OVER (PARTITION BY "t"."year_trip" ORDER BY "t"."total_trips" DESC) AS "rn",
          "u"."age" AS "age",
          "u"."genre" AS "genre",
          "u"."year_created_at" AS "year_created_at"
	FROM "ecobici"."trips_by_users_per_year" "t"
	LEFT JOIN "ecobici"."users" "u" on "t"."user_id" = "u"."user_id"
) "ranked"
WHERE ("ranked"."rn" <= 50);

CREATE TABLE `trips_top_users_duration` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`year_trip` VARCHAR(10) NOT NULL COLLATE 'utf8mb4_general_ci',
	`user_id` INT(10) UNSIGNED NOT NULL DEFAULT '0',
	`total_duration` BIGINT(19) NOT NULL DEFAULT '0',
	`age` INT(10) NULL DEFAULT NULL,
	`genre` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`year_created_at` VARCHAR(10) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `year_trip` (`year_trip`) USING BTREE,
	INDEX `user_id` (`user_id`) USING BTREE,
	INDEX `year_trip_user_id` (`year_trip`, `user_id`) USING BTREE
) COLLATE='utf8mb4_general_ci';

-- Query Insert Top 50 usuarios que ocuparon mas tiempo el servicio
INSERT INTO ecobici.trips_top_users_duration (year_trip, user_id, total_duration, age, genre, year_created_at)
SELECT "ranked"."year_trip" AS "year_trip",
       "ranked"."user_id" AS "user_id",
       "ranked"."total_duration" AS "total_duration",
       "ranked"."age" AS "age",
       "ranked"."genre" AS "genre",
       "ranked"."year_created_at" AS "year_created_at"
FROM  (
  SELECT "t"."year_trip" AS "year_trip",
          "t"."user_id" AS "user_id",
          "t"."total_duration" AS "total_duration",
          row_number() OVER (PARTITION BY "t"."year_trip" ORDER BY "t"."total_duration" DESC) AS "rn",
          "u"."age" AS "age",
          "u"."genre" AS "genre",
          "u"."year_created_at" AS "year_created_at"
	FROM "ecobici"."trips_by_users_per_year" "t"
	LEFT JOIN "ecobici"."users" "u" on "t"."user_id" = "u"."user_id"
) "ranked"
WHERE ("ranked"."rn" <= 50);


CREATE TABLE `trips_top_users_distance` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`year_trip` VARCHAR(10) NOT NULL COLLATE 'utf8mb4_general_ci',
	`user_id` INT(10) UNSIGNED NOT NULL DEFAULT '0',
	`total_distance` DECIMAL(20,6) NOT NULL DEFAULT '0.000000',
	`age` INT(10) NULL DEFAULT NULL,
	`genre` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`year_created_at` VARCHAR(10) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `year_trip` (`year_trip`) USING BTREE,
	INDEX `user_id` (`user_id`) USING BTREE,
	INDEX `year_trip_user_id` (`year_trip`, `user_id`) USING BTREE
) COLLATE='utf8mb4_general_ci';

-- Query Insert Top 50 usuarios que hicieron mayor distancia (estaciones distintas)
INSERT INTO ecobici.trips_top_users_distance (year_trip, user_id, total_distance, age, genre, year_created_at)
SELECT "ranked"."year_trip" AS "year_trip",
       "ranked"."user_id" AS "user_id",
       "ranked"."total_distance" AS "total_distance",
       "ranked"."age" AS "age",
       "ranked"."genre" AS "genre",
       "ranked"."year_created_at" AS "year_created_at"
FROM  (
  SELECT "t"."year_trip" AS "year_trip",
          "t"."user_id" AS "user_id",
          "t"."total_distance" AS "total_distance",
          row_number() OVER (PARTITION BY "t"."year_trip" ORDER BY "t"."total_distance" DESC) AS "rn",
          "u"."age" AS "age",
          "u"."genre" AS "genre",
          "u"."year_created_at" AS "year_created_at"
	FROM "ecobici"."trips_by_users_per_year" "t"
	LEFT JOIN "ecobici"."users" "u" on "t"."user_id" = "u"."user_id"
) "ranked"
WHERE ("ranked"."rn" <= 50);
```

### Data Sources (Tablas de MySQL)

![Data Sources usados](/images/looker-data-sources.png)

### Blends realizados

![Blends en Looker Studio](/images/looker-blends.png)

Ejemplo de un blend entre tablas de mysql

![Ejemplo de Blend "trips_stations + stations"](/images/looker-blend-example.png)

### Filters realizados

![Filters](/images/looker-filters.png)

### Otros recursos utilizados: Group fields

Por ejemplo, para agrupar edades y mostrarlos en una tabla, se configuro un nuevo campo de la tabla `users` llamado `group_ages` y se realizo con Looker Studio, de la siguiente manera:

![Group Ages Field + MySQL table "user"](/images/group-ages-looker-studio.png)

De esta manera se puede hacer la siguiente visualización:

![Group Ages Chart](/images/looker-group-age-visual.png)
