package org.cibertec.client;

import lombok.Data;

@Data
public class ReservaDTO {
    private Integer idReserva;
    private String fecha;
    private String hora;
    private Integer numeroPersonas;
}
