package model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@Data
@Getter
@Setter
@Entity
@Table(name = "vitamiel" )


public class Vitamiel {
	
	private int id;
	private String nom;
	private String adresse;
	private String email;
	private String téléphone;
	private String pays;

	
	
	

}
