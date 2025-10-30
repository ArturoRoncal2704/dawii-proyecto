package org.cibertec.entity;



import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "tb_reserva")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idReserva;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fecha;
    
    
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime hora;
    
    @Transient
    private String origen;
    
    private Integer numeroPersonas;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "idMesa")	
    private Mesa mesa;

	

	public Reserva(Integer idReserva, LocalDate fecha, LocalTime hora, String origen, Integer numeroPersonas,
			Usuario usuario, Mesa mesa) {
		this.idReserva = idReserva;
		this.fecha = fecha;
		this.hora = hora;
		this.origen = origen;
		this.numeroPersonas = numeroPersonas;
		this.usuario = usuario;
		this.mesa = mesa;
	}

	public Reserva() {
	}

	public String getOrigen() {
		return origen;
	}

	public void setOrigen(String origen) {
		this.origen = origen;
	}

	public Integer getIdReserva() {
		return idReserva;
	}

	public void setIdReserva(Integer idReserva) {
		this.idReserva = idReserva;
	}

	public LocalDate getFecha() {
		return fecha;
	}

	public void setFecha(LocalDate fecha) {
		this.fecha = fecha;
	}

	public LocalTime getHora() {
		return hora;
	}

	public void setHora(LocalTime hora) {
		this.hora = hora;
	}

	public Integer getNumeroPersonas() {
		return numeroPersonas;
	}

	public void setNumeroPersonas(Integer numeroPersonas) {
		this.numeroPersonas = numeroPersonas;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Mesa getMesa() {
		return mesa;
	}

	public void setMesa(Mesa mesa) {
		this.mesa = mesa;
	}
    
    
}
