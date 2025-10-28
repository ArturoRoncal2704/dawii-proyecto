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
import lombok.Data;


@Entity
@Table(name = "tb_rol")
@Data
public class Rol {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Integer idRol;

	@Column(unique = true)
    private String nombre;

	@JsonIgnore
    @ManyToMany(mappedBy = "roles")
    private Set<Usuario> usuarios;
}
