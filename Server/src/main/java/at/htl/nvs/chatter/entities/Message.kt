package at.htl.nvs.chatter.entities

import javax.persistence.*

@Entity(name = "MESSAGE_TABLE")
@NamedQueries(
        NamedQuery(name = "Message.getConversationOfUsers",
                query = """select v from MESSAGE_TABLE v
                    where (v.from.userName = :u1 or v.from.userName = :u2) and
                    (v.to.userName = :u1 or v.to.userName = :u2)
                    and not (v.from.userName = v.to.userName)
                    order by v.id asc""")
)
data class Message(
        @ManyToOne
        val from: User,

        @ManyToOne
        val to: User,

        val text: String,

        @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
        val id: Long = 0
)