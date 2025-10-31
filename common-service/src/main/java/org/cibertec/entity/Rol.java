package org.cibertec.entity;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;



@Entity
@Table(name = "tb_rol")
public class Rol {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Integer idRol;

	@Column(unique = true)
    private String nombre;

	@JsonIgnore
	@ManyToMany(mappedBy = "roles")
    private Set<Usuario> usuarios;

	public Rol() {
    }
	
	
	public Rol(Integer idRol, String nombre, Set<Usuario> usuarios) {
		this.idRol = idRol;
		this.nombre = nombre;
		this.usuarios = usuarios;
	}


	public Integer getIdRol() {
		return idRol;
	}

	public void setIdRol(Integer idRol) {
		this.idRol = idRol;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Set<Usuario> getUsuarios() {
		return usuarios;
	}

	public void setUsuarios(Set<Usuario> usuarios) {
		this.usuarios = usuarios;
	}
	
	
}
