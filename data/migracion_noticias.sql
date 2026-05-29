-- Tabla: noticias
-- Ejecutar en la base de datos de CasaCambioBack

CREATE TABLE IF NOT EXISTS noticias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  subtitulo VARCHAR(500) DEFAULT NULL,
  resumen TEXT DEFAULT NULL,
  cuerpo LONGTEXT DEFAULT NULL,
  imagen_url VARCHAR(500) DEFAULT NULL,
  categoria ENUM('Tipo de cambio','Economía','Empresa','Promoción','Mercados','Internacional') NOT NULL,
  tamanio ENUM('PEQUENA','MEDIANA','GRANDE') NOT NULL DEFAULT 'PEQUENA',
  posicion_imagen ENUM('ARRIBA','IZQUIERDA','DERECHA','FONDO') NOT NULL DEFAULT 'ARRIBA',
  color_acento VARCHAR(7) DEFAULT '#02254A',
  link_externo VARCHAR(500) DEFAULT NULL,
  animacion ENUM('FADE','SLIDE','ZOOM','NINGUNA') DEFAULT 'NINGUNA',
  en_ticker TINYINT(1) DEFAULT 0,
  activa TINYINT(1) DEFAULT 1,
  orden INT DEFAULT 0,
  fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
  actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
