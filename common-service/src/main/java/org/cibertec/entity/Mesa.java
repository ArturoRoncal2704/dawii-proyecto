package org.cibertec.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_mesa")
public class Mesa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idMesa;
    private Integer numero;
    private Integer capacidad;
    private String ubicacion;

    
    @ManyToOne
    @JoinColumn(name = "idEstMesa")
    private EstadoMesa estadoMesa;


	public Mesa(Integer idMesa, Integer numero, Integer capacidad, String ubicacion, EstadoMesa estadoMesa) {
		this.idMesa = idMesa;
		this.numero = numero;
		this.capacidad = capacidad;
		this.ubicacion = ubicacion;
		this.estadoMesa = estadoMesa;
	}


	public Mesa() {
	}


	public Integer getIdMesa() {
		return idMesa;
	}


	public void setIdMesa(Integer idMesa) {
		this.idMesa = idMesa;
	}


	public Integer getNumero() {
		return numero;
	}


	public void setNumero(Integer numero) {
		this.numero = numero;
	}


	public Integer getCapacidad() {
		return capacidad;
	}


	public void setCapacidad(Integer capacidad) {
		this.capacidad = capacidad;
	}


	public String getUbicacion() {
		return ubicacion;
	}


	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}


	public EstadoMesa getEstadoMesa() {
		return estadoMesa;
	}


	public void setEstadoMesa(EstadoMesa estadoMesa) {
		this.estadoMesa = estadoMesa;
	}
    
    

}
