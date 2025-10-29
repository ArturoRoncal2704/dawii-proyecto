package org.cibertec.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(
        name = "tb_estado_mesa"
)
public class EstadoMesa {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Integer idEstMesa;
    private String descripcion;

    public EstadoMesa(Integer idEstMesa, String descripcion) {
        this.idEstMesa = idEstMesa;
        this.descripcion = descripcion;
    }

    public EstadoMesa() {
    }

    public Integer getIdEstMesa() {
        return this.idEstMesa;
    }

    public void setIdEstMesa(Integer idEstMesa) {
        this.idEstMesa = idEstMesa;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}