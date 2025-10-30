package org.cibertec.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_transporte")
public class Transporte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTransporte;
   
    private String direccion;
    private Integer numeroPasajeros;
    @ManyToOne
    @JoinColumn(name = "idReserva")
    private Reserva reserva;
    
	public Transporte(Integer idTransporte, String direccion, Integer numeroPasajeros, Reserva reserva) {
		this.idTransporte = idTransporte;
		this.direccion = direccion;
		this.numeroPasajeros = numeroPasajeros;
		this.reserva = reserva;
	}

	public Transporte() {
	}

	public Integer getIdTransporte() {
		return idTransporte;
	}

	public void setIdTransporte(Integer idTransporte) {
		this.idTransporte = idTransporte;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public Integer getNumeroPasajeros() {
		return numeroPasajeros;
	}

	public void setNumeroPasajeros(Integer numeroPasajeros) {
		this.numeroPasajeros = numeroPasajeros;
	}

	public Reserva getReserva() {
		return reserva;
	}

	public void setReserva(Reserva reserva) {
		this.reserva = reserva;
	}
    
    
}
